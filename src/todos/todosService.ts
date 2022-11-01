import User from '@/models/user';

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
}
