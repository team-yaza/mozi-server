import { Request, Response } from 'express';

import { findAllTodos, createTodo, deleteTodo, updateTodo, findTodo } from '@/services/todo';
// import { createAlarm, deleteAlarm } from '@/services/alarm';

export const getAllTodosHandler = async (req: Request, res: Response) => {
  const todos = await findAllTodos();
  res.status(200).json(todos);
};

export const getTodoHandler = async (req: Request, res: Response) => {
  const todos = await findTodo(req.params.id);

  res.status(200).json(todos);
};

export const createTodoHandler = async (req: Request, res: Response) => {
  const todo = await createTodo(req.body);

  res.status(201).json(todo);
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  const result = await deleteTodo(req.params.id);
  // await deleteAlarm(req.params.id);

  if (result) res.status(200).json(result);
  else throw 'Todo was not found';
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  const { affectedCount } = await updateTodo(req.params.id, req.body);

  const todo = await findTodo(req.params.id);

  // const location: any = (todo as any).location;

  // 첫번째 오브젝트 아이디는 유저 정보를 담고있어야함.
  // if (location.name && changeLocationFlag) {
  //   await createAlarm(new mongoose.Types.ObjectId('123456789011'), req.params.id);
  // }

  if (affectedCount) res.status(201).json(todo);
  else throw 'Todo was not updated';
};
