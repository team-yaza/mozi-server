import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute } from 'sequelize';
import User from '@/models/user';

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<string>;

  declare userId: ForeignKey<User['id']>;
  declare owner?: NonAttribute<User>;

  declare title: string;
  declare description: string;

  declare done: CreationOptional<boolean>;
  declare alarmed: CreationOptional<boolean>;

  declare locationName: CreationOptional<string>;
  declare longitude: CreationOptional<number>;
  declare latitude: CreationOptional<number>;

  declare index: CreationOptional<number>;
}

export default Todo;
