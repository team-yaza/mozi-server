import Todo from '@models/todo';

export const findAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

export const createTodo = async (todo: any) => {
  const newTodo = await Todo.create(todo);
  return newTodo;
};
