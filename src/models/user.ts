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
} from 'sequelize';

import Todo from '@/models/todo';

class User extends Model<InferAttributes<User, { omit: 'todos' }>, InferCreationAttributes<User, { omit: 'todos' }>> {
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
  declare createTodo: HasManyCreateAssociationMixin<Todo, 'ownerId'>;

  declare todos?: NonAttribute<Todo[]>;

  declare static associations: {
    todos: Association<User, Todo>;
  };
}

export default User;
