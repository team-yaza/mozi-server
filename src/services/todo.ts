import Todo from '@/models/todo';
import { serializeGeoJson } from '@/utils/serialize';

export const findAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

export const findTodo = async (id: any) => {
  const todo = await Todo.findOne({
    _id: id,
  });
  return todo;
};

export const createTodo = async (todo: any) => {
  const { longitude, latitude } = todo;
  todo.location = serializeGeoJson(longitude, latitude);
  const newTodo = await Todo.create(todo);
  return newTodo;
};

export const deleteTodo = async (id: any) => {
  const result = await Todo.findOneAndDelete({
    _id: id,
  });
  return result;
};

export const updateTodo = async (id: any, todo: any) => {
  if (todo.longitude && todo.latitude) todo.location = serializeGeoJson(todo.longitude, todo.latitude);
  const result = await Todo.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      ...todo,
    },
  );
  return result;
};
