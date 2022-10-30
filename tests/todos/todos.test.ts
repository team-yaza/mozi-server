// import express, { Application } from 'express';
// import loader from '../../src/loaders/index';

// import { User } from '../users/user';
// import MUser from '../../src/models/user';
// import config from '../../src/config';
// import jwt from 'jsonwebtoken';

// import { MockTodo, removeAllTodos, request } from './todo';

// let app: Application;
// let user: User;
// let token: string;

// beforeAll(async () => {
//   app = express();
//   await loader(app);

//   user = new User();
//   await MUser.create(user);

//   token = jwt.sign(Object.assign({}, user), config.jwtSecret, { issuer: 'hyunjin' });
// });

// afterAll(async () => {
//   await MUser.destroy({
//     where: {
//       id: user.id,
//     },
//     force: true,
//   });
// });

// beforeEach(async () => {
//   await removeAllTodos(user.id);
// });

// afterEach(async () => {
//   await removeAllTodos(user.id);
// });

// describe('Todo CRUD', () => {
//   test('GET /todos', async () => {
//     let todos: MockTodo[] = [];
//     for (let i = 0; i < 3; i++) {
//       todos.push(new MockTodo(user));
//     }

//     await Promise.all(
//       todos.map(async (todo) => {
//         todo = await Todo.create(todo);
//         (
//           await MUser.findOne({
//             where: {
//               id: user.id,
//             },
//           })
//         )?.addTodo();
//       }),
//     );

//     const response = await request(app, 'get', '/api/v1/todos', token).expect(200);
//     console.log(response.body);
//   });
//   test('POST /todos', async () => {});
//   test('GET /todos/{id}', async () => {});
//   test('DELETE /todos/{id}', async () => {});
//   test('PATCH /todos/{id}', async () => {});
// });
