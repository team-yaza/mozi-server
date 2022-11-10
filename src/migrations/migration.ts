import { User } from '@/users/user';
import { TodoCreationParams } from '@/todos/todo';
import { TodosService } from '@/todos/todosService';

export abstract class Migration {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  async migrate(authorizationCode: string): Promise<void> {
    await this.auth(authorizationCode);
    const data = await this.pull();
    const todos = this.parse(data);
    await this.push(todos);
  }

  abstract url(scopes: string[]): string;

  abstract auth(authorizationCode: string): Promise<void>;

  abstract pull(): Promise<any[]>;

  abstract parse(data: any[]): TodoCreationParams[];

  async push(todos: TodoCreationParams[]) {
    for (const todo of todos) {
      await new TodosService().create(this.user, todo);
    }
  }
}
