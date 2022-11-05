import express, { Application } from 'express';
import loader from '../../src/loaders/index';

import { getToken, MockUserCreateParams } from '../users/user';

import { MockTodoCreationParams, removeAllTodos, request } from './todo';
import Todo from '../../src/models/todo';
import User from '../../src/models/user';

let app: Application;
let user: User;
let token: string;

beforeAll(async () => {
  app = express();
  await loader(app);

  user = await User.create(new MockUserCreateParams());
  const { id, name, email, profileImage } = user;

  token = getToken(id, name, email, profileImage!);
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

describe('Todo CRUD', () => {
  test('POST /todos', async () => {
    const input = new MockTodoCreationParams();

    const response = await request(app, 'post', '/api/v1/todos', token).send(input).expect(201);
    const output = response.body;

    expect(input.title).toBe(output.title);
  });

  test('GET /todos/{id}', async () => {
    const input = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(input);

    const response = await request(app, 'get', `/api/v1/todos/${input.id}`, token).expect(200);
    const output = response.body;

    expect(input.title).toBe(output.title);
  });

  test('DELETE /todos/{id}', async () => {
    const input = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(input);

    await request(app, 'delete', `/api/v1/todos/${input.id}`, token).expect(200);

    const output = await Todo.findByPk(input.id);

    expect(output).toBeFalsy();
  });
});

describe('Todo Update', () => {
  test('PATCH /todos/{id}', async () => {
    const before = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(before);

    const after = new MockTodoCreationParams();

    await request(app, 'patch', `/api/v1/todos/${before.id}`, token).send(after).expect(204);
    const output = await Todo.findByPk(before.id);

    expect(output!.title).toBe(after.title);
  });

  test('Restore deletedTodo', async () => {
    const input = await Todo.create(new MockTodoCreationParams());
    await user.addTodo(input);
    await input.destroy();

    await request(app, 'patch', `/api/v1/todos/${input.id}/restore`, token).expect(204);

    const result = await Todo.findOne({
      where: {
        id: input.id,
      },
    });

    expect(result).toBeTruthy();
  });
});
