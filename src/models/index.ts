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

      dueDate: DataTypes.DATE,
      alarmDate: DataTypes.DATE,

      locationName: DataTypes.STRING,
      longitude: DataTypes.FLOAT,
      latitude: DataTypes.FLOAT,

      index: DataTypes.INTEGER,
    },
    {
      tableName: 'todos',
      paranoid: true,
      sequelize,
    },
  );
};

const todoUserInit = () => {
  User.hasMany(Todo, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'todos',
  });
};

const modelInit = async () => {
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'db';
  const sequelize = new Sequelize(`mysql://root:root@${host}:3306/mozi`, {
    logging: false,
    database: 'mozi',
  });

  todoInit(sequelize);
  userInit(sequelize);
  todoUserInit();

  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log(error);
  }
};

export default modelInit;
