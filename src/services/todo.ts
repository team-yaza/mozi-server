import { v4 as uuid } from 'uuid';
import Todo from '@/models/todo';

export const findAllTodos = async (ownerId: string) => {
  const todos = await Todo.findAll({
    where: {
      ownerId,
    },
  });
  return todos;
};

export const findTodo = async (id: string) => {
  const todo = await Todo.findByPk(id);
  return todo;
};

export const createTodo = async (todo: any) => {
  const newTodo = await Todo.create({ ...todo, id: uuid() });
  return newTodo;
};

export const deleteTodo = async (id: string) => {
  const result = await Todo.destroy({
    where: {
      id,
    },
  });
  return result;
};

export const updateTodo = async (id: any, todo: any) => {
  const [affectedCount] = await Todo.update(
    {
      ...todo,
    },
    {
      where: {
        id,
      },
    },
  );
  return affectedCount;
};

export const deleteAllTodos = async (ownerId: string) => {
  const result = await Todo.destroy({
    where: {
      ownerId,
    },
  });

  return result;
};
