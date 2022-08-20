import Todo from '@/models/todo';
import { serializeGeoJson } from '@/utils/serialize';

export const findAllTodos = async () => {
  const todos = await Todo.find();

  if (todos.length === 0) return null;

  return todos;
};

export const findTodo = async (id: string) => {
  const todo = await Todo.findOne({
    _id: id,
  });
  return todo;
};

export const createTodo = async (todo: any) => {
  const newTodo = await Todo.create(todo);
  return newTodo;
};

export const deleteTodo = async (id: string) => {
  const result = await Todo.findOneAndDelete({
    _id: id,
  });
  return result;
};

export const updateTodo = async (id: any, todo: any) => {
  if (todo.longitude && todo.latitude) todo.location = await serializeGeoJson(todo.longitude, todo.latitude);
  const result = await Todo.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      ...todo,
    },
    {
      new: true,
    },
  );
  const changeLocationFlag = todo.longitude && todo.latitude ? true : false;
  return { result, changeLocationFlag };
};

export const updateTodoAlarmed = async (id: any, alarmed: boolean) => {
  const result = await Todo.findByIdAndUpdate(
    {
      _id: id,
    },
    { alarmed },
  );
  return result;
};
