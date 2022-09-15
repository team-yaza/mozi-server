import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute } from 'sequelize';
import User from '@/models/user';

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<string>;

  declare ownerId: ForeignKey<User['id']>;
  declare owner?: NonAttribute<User>;

  declare title: string;
  declare description: string;
  declare done?: boolean;
  declare alarmed?: boolean;
  declare longitude?: CreationOptional<number>;
  declare latitude?: CreationOptional<number>;
}

export default Todo;
