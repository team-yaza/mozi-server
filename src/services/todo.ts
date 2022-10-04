import Todo from '@/models/todo';

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
    paranoid: false,
  });

  await updatedTodo?.update({
    ...newTodo,
  });

  return updatedTodo;
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
