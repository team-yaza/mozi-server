import User from '@/models/user';
import Todo from '@/models/todo';

import { TodoCreationParams } from './todo';

export class TodosService {
  public async getAll(user: User) {
    return await user.getTodos();
  }

  public async get(user: User, todoId: string) {
    return await user.getTodos({
      where: {
        id: todoId,
      },
    });
  }

  public async create(user: User, params: TodoCreationParams) {
    const todo = Todo.build(params);

    await user.addTodo(todo);

    return todo;
  }
}
