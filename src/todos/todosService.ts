import { User } from '@/users/user';
import { Todo } from '@/todos/todo';
import { TodoCreationParams, TodoUpdateParams } from './todo';
import { WhereOptions } from 'sequelize/types';
import { todoNotFound } from '@/utils/error';

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

    if (todoId && todos.length === 0) {
      throw todoNotFound;
    }

    return todos;
  }

  public async create(user: User, params: TodoCreationParams) {
    const todo = await Todo.create({
      title: params.title,
      description: params.description,

      done: params.done,
      alarmed: params.alarmed,

      dueDate: params.dueDate,
      alarmDate: params.alarmDate,

      locationName: params.locationName,
      longitude: params.longitude,
      latitude: params.latitude,

      index: params.index,
    });

    await user.addTodo(todo);

    return todo;
  }

  public async remove(user: User, todoId?: string) {
    const where: WhereOptions = {};
    if (todoId) {
      where.id = todoId;
    }

    const todos = await user.getTodos({
      where,
      paranoid: false,
    });

    if (todoId && todos.length === 0) {
      throw todoNotFound;
    }

    for (const todo of todos) {
      await todo.destroy({
        force: true,
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

    if (!todo) {
      throw todoNotFound;
    }

    await todo.update(params);

    if (restore) {
      await todo.restore();
    }

    return todo;
  }

  public async sync(user: User, todoId: string, params: TodoUpdateParams) {
    const [todo] = await Todo.upsert({
      id: todoId,
      userId: user.id,

      title: params.title,
      description: params.description,

      done: params.done,
      alarmed: params.alarmed,

      dueDate: params.dueDate,
      alarmDate: params.alarmDate,

      locationName: params.locationName,
      longitude: params.longitude,
      latitude: params.latitude,

      index: params.index,
    });

    if (params.deletedAt === null || params.deletedAt === undefined) {
      await todo.restore();
    } else {
      todo.setDataValue('deletedAt' as any, params.deletedAt);
    }
    await todo.save();

    return todo;
  }
}
