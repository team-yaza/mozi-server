import Todo from '@/models/todo';

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
  const newTodo = await Todo.create(todo);
  return newTodo;
};

export const deleteTodo = async (id: any) => {
  const result = await Todo.findOneAndDelete({
    _id: id,
  });
  return result;
};

export const updateTodo = async (id: any, title: any) => {
  const result = await Todo.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      title,
    },
  );
  return result;
};
