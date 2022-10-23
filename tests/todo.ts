import { Application } from 'express';
import supertest from 'supertest';
import Todo from '../src/types/todo';

type method = 'get' | 'post' | 'delete' | 'patch';

const request = (app: Application, method: method, url: string) => {
  return supertest(app)[method](url).set('Authorization', process.env.TEST_TOKEN!);
};

export const getAllTodos = async (app: Application): Promise<Todo[]> => {
  const test = request(app, 'get', '/api/v1/todos');
  const response = await test.expect(200);
  return response.body;
};

export const getTodo = async (app: Application, id: string): Promise<Todo> => {
  const test = request(app, 'get', `/api/v1/todos/${id}`);
  const response = await test.expect(200);
  return response.body;
};

export const createTodo = async (app: Application, newTodo: Todo): Promise<Todo> => {
  const test = request(app, 'post', '/api/v1/todos');
  test.send(newTodo);
  const response = await test.expect(201);
  return response.body;
};

export const deleteTodo = async (app: Application, id: string) => {
  const test = request(app, 'delete', `/api/v1/todos/${id}`);
  const response = await test.expect(200);
  return response.body;
};

export const updateTodo = async (app: Application, id: string, newTodo: Todo): Promise<Todo> => {
  const test = request(app, 'patch', `/api/v1/todos/${id}`);
  test.send(newTodo);
  const response = await test.expect(201);
  return response.body;
};
