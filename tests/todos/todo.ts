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

  compare(data: Todo | MockTodo) {
    return this.id.localeCompare(data.id);
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
