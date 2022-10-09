import Todo from '@/models/todo';
import { todoNotFound } from '@/utils/error';

export const findAllTodos = async (userId: string) => {
  const todos = await Todo.findAll({
    where: {
      userId,
    },
    paranoid: false,
  });

  return todos;
};

export const findTodo = async (todoId: string) => {
  const todo = await Todo.findOne({
    where: {
      id: todoId,
    },
    paranoid: false,
  });

  if (!todo) throw todoNotFound;

  return todo;
};

export const createTodo = async (todo: Todo) => {
  const newTodo = await Todo.create({ ...todo });

  return newTodo;
};

export const deleteTodo = async (todoId: string, force = false) => {
  const result = await Todo.findOne({
    where: {
      id: todoId,
    },
    paranoid: false,
  });

  if (!todo) throw todoNotFound;

  await todo.destroy({
    force,
  });

  return todo;
};

export const updateTodo = async (todoId: string, newTodo: any) => {
  const todo = await Todo.findOne({
    where: {
      id: todoId,
    },
    paranoid: false,
  });

  if (!todo) throw todoNotFound;

  await todo.update({
    ...newTodo,
  });

  return todo;
};

export const deleteAllTodos = async (userId: string) => {
  const result = await Todo.destroy({
    where: {
      userId,
    },
    force: true,
  });

  return result;
};
