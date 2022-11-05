import User from '@/models/user';
import Todo from '@/models/todo';

import { TodoCreationParams } from './todo';
import { WhereOptions } from 'sequelize/types';

export class TodosService {
  public async get(user: User, todoId?: string) {
    const where: WhereOptions = {};
    if (todoId) {
      where.id = todoId;
    }

    const todos = await user.getTodos({
      where,
      paranoid: false,
    });

    return todos;
  }

  public async create(user: User, params: TodoCreationParams) {
    const todo = await Todo.create(params);

    await user.addTodo(todo);

    return todo;
  }

  public async remove(user: User, todoId?: string, force = false) {
    const where: WhereOptions = {};
    if (todoId) {
      where.id = todoId;
    }

    const todos = await user.getTodos({
      where,
      paranoid: false,
    });

    for (const todo of todos) {
      await todo.destroy({
        force,
      });
    }
  }

  public async update(user: User, todoId: string, params: TodoCreationParams, restore = false) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    await todo.update(params);

    if (restore) {
      await todo.restore();
    }

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
