import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  CreationOptional,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Sequelize,
  DataTypes,
  UUID,
  UUIDV4,
} from 'sequelize';

import { Todo } from '@/todos/todo';

export class User extends Model<
  InferAttributes<User, { omit: 'todos' }>,
  InferCreationAttributes<User, { omit: 'todos' }>
> {
  declare id: CreationOptional<string>;

  declare name: string;
  declare email: string;
  declare password?: string;
  declare thumbnailImage?: string;
  declare profileImage?: string;

  declare getTodos: HasManyGetAssociationsMixin<Todo>;
  declare addTodo: HasManyAddAssociationMixin<Todo, number>;
  declare addTodos: HasManyAddAssociationMixin<Todo, number>;
  declare setTodos: HasManySetAssociationsMixin<Todo, number>;
  declare removeTodo: HasManyRemoveAssociationMixin<Todo, number>;
  declare removeTodos: HasManyRemoveAssociationsMixin<Todo, number>;
  declare hasTodo: HasManyHasAssociationMixin<Todo, number>;
  declare hasTodos: HasManyHasAssociationsMixin<Todo, number>;
  declare countTodos: HasManyCountAssociationsMixin;
  declare createTodo: HasManyCreateAssociationMixin<Todo, 'userId'>;

  declare todos?: NonAttribute<Todo[]>;

  declare static associations: {
    todos: Association<User, Todo>;
  };
}

export const define = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },

      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,

      thumbnailImage: DataTypes.STRING,
      profileImage: DataTypes.STRING,
    },
    {
      tableName: 'users',
      sequelize,
    },
  );
};

export interface UserCreationParams {
  id: string;
  name: string;
  email: string;
  password?: string;
  thumbnailImage?: string;
  profileImage?: string;
}
