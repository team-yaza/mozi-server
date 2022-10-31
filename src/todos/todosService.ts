import Todo from '@/models/todo';

export class TodosService {
  public async getAll(userId: string) {
    return await Todo.findAll({
      where: {
        userId,
      },
      paranoid: false,
    });
  }
}
