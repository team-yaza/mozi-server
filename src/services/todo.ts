import Todo from '@/models/todo';

export const findAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

export const findTodo = async (todoId: any) => {
  const todo = await Todo.findOne({
    _id: todoId,
  });
  return todo;
};

export const createTodo = async (todo: any) => {
  const newTodo = await Todo.create(todo);
  return newTodo;
};

export const deleteTodo = async (todoId: any) => {
  const result = await Todo.findOneAndDelete({
    _id: todoId,
  });
  return result;
};

export const updateTodo = async (todoId: any, newTitle: any) => {
  const result = await Todo.findByIdAndUpdate(
    {
      _id: todoId,
    },
    {
      title: newTitle,
    },
  );
  return result;
};
