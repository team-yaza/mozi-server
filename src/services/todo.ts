import Todo from '@/models/todo';

export const findAllTodos = async (ownerId: string) => {
  const todos = await Todo.findAll({
    where: {
      ownerId,
    },
  });

  return todos;
};

export const findTodo = async (todoId: string) => {
  const todo = await Todo.findOne({
    where: {
      id: todoId,
    },
  });

  return todo;
};

export const createTodo = async (todo: Todo) => {
  const newTodo = await Todo.create({ ...todo });

  return newTodo;
};

export const deleteTodo = async (todoId: string) => {
  const result = await Todo.destroy({
    where: {
      id: todoId,
    },
  });

  return result;
};

export const updateTodo = async (todoId: string, newTodo: any) => {
  const updatedTodo = await Todo.findOne({
    where: {
      id: todoId,
    },
  });

  await updatedTodo?.update({
    ...newTodo,
  });

  return updatedTodo;
};

export const deleteAllTodos = async (ownerId: string) => {
  const result = await Todo.destroy({
    where: {
      ownerId,
    },
  });

  return result;
};
