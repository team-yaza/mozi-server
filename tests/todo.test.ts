// import express, { Application } from 'express';
// import loader from '../src/loaders';

// import { createTodo, deleteTodo, getAllTodos, updateTodo } from './todo';
// import Todo from '../src/types/todo';

// const newTodo: Todo = {
//   title: 'hello',
//   description: 'what is this?',
//   locationName: '충남대 도서관',
//   longitude: 123,
//   latitude: 47,
// };

// const updatedTodo: Todo = {
//   title: 'bye bye',
//   description: 'Never mind',
//   locationName: '유성온천 역',
//   longitude: 123,
//   latitude: 47,
// };

// let app: Application;

// beforeAll(async () => {
//   app = express();
//   await loader(app);
// });

// describe('Todo service', () => {
//   test('GET /api/v1/todos', async () => {
//     const todos = await getAllTodos(app);

//     expect(Array.isArray(todos)).toBeTruthy();
//   });

//   test('POST /api/v1/todos', async () => {
//     const todo = await createTodo(app, newTodo);

//     expect(todo).toMatchObject(newTodo);
//   });

//   test('PATCH /api/v1/todos', async () => {
//     const [firstTodo] = await getAllTodos(app);
//     const { id } = firstTodo;

//     const todo = await updateTodo(app, id!, updatedTodo);

//     expect(todo).toMatchObject(updatedTodo);
//   });

//   test('DELETE /api/v1/todos', async () => {
//     const [firstTodo] = await getAllTodos(app);
//     const { id } = firstTodo;

//     const todo = await deleteTodo(app, id!);

//     expect(todo.id!).toEqual(id);
//   });
// });
