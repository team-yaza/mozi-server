import Todo from '@/models/todo';

export const findAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

export const createTodo = async (todo: any) => {
  const newTodo = await Todo.create(todo);
  return newTodo;
};

export const deleteTodo = async (todoId: any) => {
  console.log(todoId);
  try {
    const result = await Todo.findOneAndDelete({
      _id: todoId,
    });
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};
