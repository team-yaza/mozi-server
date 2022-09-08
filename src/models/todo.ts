import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '@/models';

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare done?: boolean;
  declare alarmed?: boolean;
  declare longitude?: CreationOptional<number>;
  declare latitude?: CreationOptional<number>;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    alarmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
  },
  {
    tableName: 'todos',
    sequelize,
  },
);

(async () => {
  await Todo.sync();
})();

export default Todo;
