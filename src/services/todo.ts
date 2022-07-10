import Todo from '@/models/todo';

export const createTodo = async (data: { title: string }) => {
  return await Todo.create(data);
};
