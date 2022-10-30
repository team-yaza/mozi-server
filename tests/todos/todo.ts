import { Application } from 'express';
import supertest from 'supertest';

import { faker as fakerko } from '@faker-js/faker/locale/ko';
import { faker } from '@faker-js/faker';
import { Query } from '../location/location';

import Todo from '../../src/models/todo';

export class MockTodo {
  declare id: string;
  declare userId: string;

  declare title: string;
  declare description: string;

  declare done: boolean;
  declare alarmed: boolean;

  declare dueDate: Date;
  declare alarmDate: Date;

  declare locationName: string;
  declare longitude: number;
  declare latitude: number;

  declare index: number;

  constructor(userId: string) {
    this.id = faker.datatype.uuid();
    this.userId = userId;

    this.title = fakerko.commerce.product();
    this.description = fakerko.commerce.productDescription();

    this.done = false;
    this.alarmed = false;

    this.dueDate = faker.date.soon();
    this.alarmDate = faker.date.soon();

    const { keyword: locationName, longitude, latitude } = new Query();
    this.locationName = locationName;
    this.longitude = longitude;
    this.latitude = latitude;

    this.index = faker.datatype.number(100);
  }

  async register() {
    await Todo.create(this);
  }
}

export const request = (app: Application, method: 'get' | 'post' | 'delete' | 'patch', url: string, token: string) => {
  return supertest(app)[method](url).set('Authorization', `Bearer ${token}`);
};

export const removeAllTodos = async (userId: string) => {
  await Todo.destroy({
    where: {
      userId,
    },
    force: true,
  });
};

// export const getAllTodos = async (app: Application): Promise<Todo[]> => {
//   const test = request(app, 'get', '/api/v1/todos');
//   const response = await test.expect(200);
//   return response.body;
// };

// export const getTodo = async (app: Application, id: string): Promise<Todo> => {
//   const test = request(app, 'get', `/api/v1/todos/${id}`);
//   const response = await test.expect(200);
//   return response.body;
// };

// export const createTodo = async (app: Application, newTodo: Todo): Promise<Todo> => {
//   const test = request(app, 'post', '/api/v1/todos');
//   test.send(newTodo);
//   const response = await test.expect(201);
//   return response.body;
// };

// export const deleteTodo = async (app: Application, id: string) => {
//   const test = request(app, 'delete', `/api/v1/todos/${id}`);
//   const response = await test.expect(200);
//   return response.body;
// };

// export const updateTodo = async (app: Application, id: string, newTodo: Todo): Promise<Todo> => {
//   const test = request(app, 'patch', `/api/v1/todos/${id}`);
//   test.send(newTodo);
//   const response = await test.expect(201);
//   return response.body;
// };
