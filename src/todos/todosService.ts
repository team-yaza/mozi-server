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
    const todo = Todo.build(params);

    await user.addTodo(todo);

    return todo;
  }

  public async remove(user: User, todoId: string) {
    const [todo] = await user.getTodos({
      where: {
        id: todoId,
      },
    });

    await todo.destroy();

    return todo;
  }
}
