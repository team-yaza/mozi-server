import express, { Application } from 'express';
import loader from '../../src/loaders/index';

import { getToken, MockUserCreateParams } from '../users/user';

import { MockTodoCreationParams, removeAllTodos, request, createTodo, MockTodoUpdateParams } from './todo';
import { User } from '../../src/users/user';
import { Todo } from '../../src/todos/todo';
import { faker } from '@faker-js/faker';
import { TodoCreationParams } from '../../src/todos/todo';

let app: Application;
let user: User;
let token: string;

beforeAll(async () => {
  app = express();
  await loader(app);

  user = await User.create(new MockUserCreateParams());
  const { id, name, email, profileImage } = user;

  token = getToken(id, name, email, profileImage ?? '');
});

afterAll(async () => {
  await user.destroy({
    force: true,
  });
});

beforeEach(async () => {
  await removeAllTodos(user);
});

afterEach(async () => {
  await removeAllTodos(user);
});

describe('GET /todos', () => {
  test('get 3 todos', async () => {
    let input: Todo[] = [];

    for (let i = 0; i < 3; i++) {
      const todo = await Todo.create(new MockTodoCreationParams());
      await user.addTodo(todo);

      input.push(todo);
    }

    const response = await request(app, 'get', '/api/v1/todos', token).expect(200);
    let output = response.body;

    input = input.sort((a: Todo, b: Todo) => a.id.localeCompare(b.id));
    output = output.sort((a: Todo, b: Todo) => a.id.localeCompare(b.id));

    for (let i = 0; i < 3; i++) {
      expect(input[i].id).toEqual(output[i].id);
    }
  });

  test('get 3 soft deleted todos', async () => {
    let input: Todo[] = [];

    for (let i = 0; i < 3; i++) {
      const todo = await Todo.create(new MockTodoCreationParams());
      await user.addTodo(todo);
      await todo.destroy();

      input.push(todo);
    }

    const response = await request(app, 'get', '/api/v1/todos', token).expect(200);
    let output = response.body;

    input = input.sort((a: Todo, b: Todo) => a.id.localeCompare(b.id));
    output = output.sort((a: Todo, b: Todo) => a.id.localeCompare(b.id));

    for (let i = 0; i < 3; i++) {
      expect(input[i].id).toBe(output[i].id);
    }
  });

  test('get 3 hard deleted todos', async () => {
    for (let i = 0; i < 3; i++) {
      const todo = await Todo.create(new MockTodoCreationParams());
      await user.addTodo(todo);
      await todo.destroy({
        force: true,
      });
    }

    const response = await request(app, 'get', '/api/v1/todos', token).expect(200);
    const output = response.body;

    expect(output).toEqual([]);
  });
});

describe('POST /todos', () => {
  test('create one todo', async () => {
    const input = new MockTodoCreationParams();

    const response = await request(app, 'post', '/api/v1/todos', token).send(input).expect(201);
    const output = response.body;

    expect(input.title).toEqual(output.title);
  });

  test('bad request (includes id)', async () => {
    const input: any = new MockTodoCreationParams();
    input.id = faker.datatype.uuid();

    await request(app, 'post', '/api/v1/todos', token).send(input).expect(422);
  });
});

describe('DELETE /todos', () => {
  test('deleted', async () => {
    const input: Todo[] = [];

    for (let i = 0; i < 3; i++) {
      const todo = await Todo.create(new MockTodoCreationParams());
      await user.addTodo(todo);

      input.push(todo);
    }

    await request(app, 'delete', '/api/v1/todos', token).expect(204);

    const output = await Todo.findAll({
      where: {
        id: user.id,
      },
      paranoid: false,
    });

    expect(output.length).toBe(0);
  });
});

describe('GET /todos/{id}', () => {
  test('get one todo', async () => {
    const input = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(input);

    const response = await request(app, 'get', `/api/v1/todos/${input.id}`, token).expect(200);
    const output = response.body;

    expect(input.title).toBe(output.title);
  });

  test('soft deleted', async () => {
    const input = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(input);
    await input.destroy();

    const response = await request(app, 'get', `/api/v1/todos/${input.id}`, token).expect(200);
    const output = response.body;

    expect(input.title).toBe(output.title);
    expect(output.deletedAt).toBeTruthy();
  });

  test('hard deleted', async () => {
    const input = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(input);
    await input.destroy({
      force: true,
    });

    await request(app, 'get', `/api/v1/todos/${input.id}`, token).expect(404);
  });
});

describe('DELETE /todos/{id}', () => {
  const todoExists = async (todoId: string) => {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    return todo !== undefined;
  };

  test('delete one todo', async () => {
    const todo = await createTodo(user);

    await request(app, 'delete', `/api/v1/todos/${todo.id}`, token).expect(204);

    expect(await todoExists(todo.id)).toBeFalsy();
  });

  test('delete failed', async () => {
    const todo = await createTodo(user, true, true);

    await request(app, 'delete', `/api/v1/todos/${todo.id}`, token).expect(404);
  });
});

describe('PATCH /todos/{id}', () => {
  const matches = async (params: TodoCreationParams, todoId: string, restore = false) => {
    const todo = await Todo.findByPk(todoId, {
      paranoid: restore,
    });

    return todo !== null && params.title === todo.title;
  };

  test('update todo', async () => {
    const todo = await createTodo(user);
    const updateParams = new MockTodoCreationParams();
    await request(app, 'patch', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(204);

    expect(matches(updateParams, todo.id)).toBeTruthy();
  });

  test('update failed', async () => {
    const todo = await createTodo(user, true, true);
    const updateParams = new MockTodoCreationParams();
    await request(app, 'patch', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(404);
  });

  test('wierd update(includes id but Ok)', async () => {
    const todo = await createTodo(user);
    const updateParams: any = new MockTodoCreationParams();
    updateParams.id = todo.id;

    await request(app, 'patch', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(204);
  });

  test('update deleted todo', async () => {
    const todo = await createTodo(user, true);
    const updateParams = new MockTodoCreationParams();
    await request(app, 'patch', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(204);

    expect(matches(updateParams, todo.id)).toBeTruthy();
  });

  test('restore deleted todo', async () => {
    const todo = await createTodo(user, true);
    const updateParams = new MockTodoCreationParams();
    await request(app, 'patch', `/api/v1/todos/${todo.id}?restore=true`, token).send(updateParams).expect(204);

    expect(matches(updateParams, todo.id, true)).toBeTruthy();
  });
});

describe('PUT /todos/{id}', () => {
  const matches = async (params: TodoCreationParams, todoId: string, restore = false) => {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: restore,
    });
    return todo !== undefined && params.title === todo.title;
  };

  test('create if not exists', async () => {
    const todo = await createTodo(user, true, true);
    const syncParams = new MockTodoCreationParams();

    await request(app, 'put', `/api/v1/todos/${todo.id}`, token).send(syncParams).expect(201);

    expect(await matches(syncParams, todo.id)).toBeTruthy();
  });

  test('create soft deleted todo', async () => {
    const todo = await createTodo(user, true, true);
    const updateParams = new MockTodoUpdateParams(true);

    await request(app, 'put', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(201);

    expect(await matches(updateParams, todo.id)).toBeTruthy();
    expect(await matches(updateParams, todo.id, true)).toBeFalsy();
  });

  test('update some todo to soft deleted', async () => {
    const todo = await createTodo(user);
    const updateParams = new MockTodoUpdateParams(true);

    await request(app, 'put', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(201);

    expect(await matches(updateParams, todo.id)).toBeTruthy();
    expect(await matches(updateParams, todo.id, true)).toBeFalsy();
  });

  test('update some soft deleted to soft deleted', async () => {
    const todo = await createTodo(user, true);
    const updateParams = new MockTodoUpdateParams(true);

    await request(app, 'put', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(201);

    expect(await matches(updateParams, todo.id)).toBeTruthy();
    expect(await matches(updateParams, todo.id, true)).toBeFalsy();
  });

  test('create with id', async () => {
    const todo = await createTodo(user, true, true);
    const updateParams = new MockTodoUpdateParams();

    const response = await request(app, 'put', `/api/v1/todos/${todo.id}`, token).send(updateParams).expect(201);

    expect(await matches(updateParams, todo.id)).toBeTruthy();
    expect(await matches(updateParams, todo.id, true)).toBeTruthy();
    expect(response.body.id).toEqual(todo.id);
  });

  test('restore sync by request body', async () => {
    const todo = await createTodo(user, true);

    await request(app, 'put', `/api/v1/todos/${todo.id}`, token)
      .send({
        deletedAt: null,
      })
      .expect(201);

    expect(await matches(todo, todo.id, true)).toBeTruthy();
  });

  test('restore sync by query string', async () => {
    const todo = await createTodo(user, true);

    await request(app, 'put', `/api/v1/todos/${todo.id}?restore=true`, token).send().expect(201);

    expect(await matches(todo, todo.id, true)).toBeTruthy();
  });
});
