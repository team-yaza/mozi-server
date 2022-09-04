import Todo from '@/models/todo';

export const findAllTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};

export const findTodo = async (id: string) => {
  const todo = await Todo.findByPk(id);
  return todo;
};

export const createTodo = async (todo: any) => {
  const newTodo = await Todo.create(todo);
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
  const result = await Todo.update(
    {
      ...todo,
    },
    {
      where: {
        id,
      },
    },
  );
  const changeLocationFlag = todo.longitude && todo.latitude ? true : false;
  return { affectedCount: result[0], changeLocationFlag };
};

export const updateTodoAlarmed = async (id: any, alarmed: boolean) => {
  const result = await Todo.update(
    {
      alarmed,
    },
    {
      where: {
        id,
      },
    },
  );
  return result;
};
