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

  public async get(userId: string, todoId: string) {
    return await Todo.findOne({
      where: {
        userId,
        id: todoId,
      },
      paranoid: false,
    });
  }
}
