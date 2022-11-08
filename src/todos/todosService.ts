import { User } from '@/users/user';
import { extractTodoCreationParams, Todo } from '@/todos/todo';
import { TodoValidationParams } from './todo';
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

  public async create(user: User, params: TodoValidationParams) {
    const todoCreationParams = extractTodoCreationParams(params);
    const todo = await Todo.create(todoCreationParams);

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

  public async update(user: User, todoId: string, params: TodoValidationParams, restore = false) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
      paranoid: false,
    });

    if (!todo) {
      throw todoNotFound;
    }

    const todoCreationParams = extractTodoCreationParams(params);
    await todo.update(todoCreationParams);

    if (restore) {
      await todo.restore();
    }

    return todo;
  }

  public async sync(user: User, todoId: string, params: TodoValidationParams) {
    const todoCreationParams = extractTodoCreationParams(params);
    const [todo] = await Todo.upsert({
      id: todoId,
      userId: user.id,
      ...todoCreationParams,
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
