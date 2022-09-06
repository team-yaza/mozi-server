import sequelize from '@/models';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
  thumbnail_image_url: DataTypes.STRING,
  profile_image_url: DataTypes.STRING,
});

(async () => {
  await User.sync();
})();

export default User;
