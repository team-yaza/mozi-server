import sequelize from '@/models';
import { DataTypes } from 'sequelize';

const Todo = sequelize.define('todo', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  done: DataTypes.BOOLEAN,
  alarmed: DataTypes.BOOLEAN,
  location: DataTypes.GEOMETRY,
  soft_deleted: DataTypes.BOOLEAN,
});

(async () => {
  await Todo.sync();
})();

export default Todo;
