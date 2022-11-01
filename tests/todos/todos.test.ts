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

describe('Todo CRUD', () => {
  test('GET /todos', async () => {
    let id: string[] = [];
    for (let i = 0; i < 3; i++) {
      const todo = await Todo.create(new MockTodoCreationParams());
      id.push(todo.id);
      await user.addTodo(todo);
    }

    const response = await request(app, 'get', '/api/v1/todos', token).expect(200);
    let output = response.body;

    id = id.sort();
    output = output.sort((a: Todo, b: Todo) => a.id.localeCompare(b.id));

    for (let i = 0; i < 3; i++) {
      expect(id[i]).toBe(output[i].id);
    }
  });

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

    const response = await request(app, 'delete', `/api/v1/todos/${input.id}`, token).expect(200);
    const output = response.body;

    expect(output.deletedAt).toBeTruthy();
  });
});

// describe('Todo Update', () => {
//   test('PATCH /todos/{id}', async () => {
//     const before = Todo.build(new MockTodoCreationParams());
//     await user.addTodo(before);

//     const after = new MockTodoCreationParams();

//     const response = await request(app, 'patch', `/api/v1/todos/${before.id}`, token).send(after).expect(201);
//     const output = response.body;

//     expect(output.title).toBe(after.title);
//   });

//   test('Restore deletedTodo', async () => {
//     const input = Todo.build(new MockTodoCreationParams());
//     await user.addTodo(input);
//     await user.removeTodo(input);

//     await request(app, 'patch', `/api/v1/todos/${input.id}`, token)
//       .send({
//         deletedAt: null,
//       })
//       .expect(201);

//     const result = await Todo.findOne({
//       where: {
//         id: input.id,
//       },
//     });

//     expect(result).toBeTruthy();
//   });
// });
