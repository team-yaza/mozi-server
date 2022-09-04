import sequelize from '@/models';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

(async () => {
  await User.sync();
})();

export default User;
