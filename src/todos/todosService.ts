import User from '@/models/user';
import Todo from '@/models/todo';

import { TodoCreationParams } from './todo';

export class TodosService {
  public async getAll(user: User) {
    return await user.getTodos({
      paranoid: false,
    });
  }

  public async get(user: User, todoId: string) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    return todo;
  }

  public async create(user: User, params: TodoCreationParams) {
    const todo = await Todo.create(params);

    await user.addTodo(todo);

    return todo;
  }

  public async remove(user: User, todoId: string, force = false) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    await todo.destroy({
      force,
    });

    return todo;
  }

  public async update(user: User, todoId: string, params: TodoCreationParams) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    await todo.update(params);

    return todo;
  }

  public async restore(user: User, todoId: string) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    await todo.restore();
  }
}
