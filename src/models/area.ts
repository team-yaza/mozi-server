import sequelize from '@/models';
import { DataTypes } from 'sequelize';

const Area = sequelize.define('area', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

(async () => {
  await Area.sync();
})();

export default Area;
