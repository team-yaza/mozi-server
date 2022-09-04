import sequelize from '@/models';
import { DataTypes } from 'sequelize';

const Project = sequelize.define('project', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

(async () => {
  await Project.sync();
})();

export default Project;
