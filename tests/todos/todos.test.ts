import express, { Application } from 'express';
import loader from '../../src/loaders/index';

import { MockUser } from '../users/user';
import MUser from '../../src/models/user';
import config from '../../src/config';
import jwt from 'jsonwebtoken';

import { MockTodo, removeAllTodos, request } from './todo';

let app: Application;
let user: MockUser;
let token: string;

beforeAll(async () => {
  app = express();
  await loader(app);

  user = new MockUser();
  await MUser.create(user);

  expect(process.env.PORT).toBeTruthy();
  token = jwt.sign(Object.assign({}, user), config.jwtSecret || process.env.JWT_SECRET || '', { issuer: 'hyunjin' });
});

afterAll(async () => {
  await MUser.destroy({
    where: {
      id: user.id,
    },
    force: true,
  });
});

beforeEach(async () => {
  await removeAllTodos(user.id);
});

afterEach(async () => {
  await removeAllTodos(user.id);
});

describe('Todo CRUD', () => {
  test('GET /todos', async () => {
    let input: MockTodo[] = [];
    for (let i = 0; i < 3; i++) {
      input.push(new MockTodo(user.id));
      await input[i].register();
    }

    const response = await request(app, 'get', '/api/v1/todos', token).expect(200);
    let output = response.body;

    const compare = (a: MockTodo, b: MockTodo) => a.id.localeCompare(b.id);
    input = input.sort(compare);
    output = output.sort(compare);

    for (let i = 0; i < 3; i++) {
      expect(input[i].id).toBe(output[i].id);
    }
  });

  // test('POST /todos', async () => {});
  // test('GET /todos/{id}', async () => {});
  // test('DELETE /todos/{id}', async () => {});
  // test('PATCH /todos/{id}', async () => {});
});
