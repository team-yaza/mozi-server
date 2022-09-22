import { Sequelize, DataTypes, UUID, UUIDV4 } from 'sequelize';
import User from '@/models/user';
import Todo from '@/models/todo';

const userInit = (sequelize: Sequelize) => {
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

      image: DataTypes.STRING,
      thumbnailImage: DataTypes.STRING,
      profileImage: DataTypes.STRING,
    },
    {
      tableName: 'users',
      sequelize,
    },
  );
};

const todoInit = (sequelize: Sequelize) => {
  Todo.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
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

      index: DataTypes.INTEGER,
      softDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'todos',
      sequelize,
    },
  );
};

const todoUserInit = () => {
  User.hasMany(Todo, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'todos',
  });
};

const modelInit = async () => {
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'db';
  const sequelize = new Sequelize(`mysql://root:root@${host}:3306/mozi`, {
    logging: false,
  });
  todoInit(sequelize);
  userInit(sequelize);
  todoUserInit();
  await sequelize.sync();
};

export default modelInit;
