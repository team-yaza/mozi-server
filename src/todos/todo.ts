import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Sequelize,
  DataTypes,
  UUID,
  UUIDV4,
} from 'sequelize';
import { User } from '@/users/user';

export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<string>;

  declare userId: ForeignKey<User['id']>;
  declare owner?: NonAttribute<User>;

  declare title: CreationOptional<string>;
  declare description: CreationOptional<string>;

  declare done: CreationOptional<boolean>;
  declare alarmed: CreationOptional<boolean>;

  declare dueDate: CreationOptional<Date>;
  declare alarmDate: CreationOptional<Date>;

  declare locationName: CreationOptional<string>;
  declare longitude: CreationOptional<number>;
  declare latitude: CreationOptional<number>;

  declare index: CreationOptional<number>;
}

export const define = (sequelize: Sequelize) => {
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

export interface TodoValidationParams {
  [key: string]: any;

  title?: string | null;
  description?: string | null;

  done?: boolean | null;
  alarmed?: boolean | null;

  dueDate?: Date | null;
  alarmDate?: Date | null;

  locationName?: string | null;
  longitude?: number | null;
  latitude?: number | null;

  index?: number | null;
}

export interface TodoCreationParams {
  title?: string;
  description?: string;

  done?: boolean;
  alarmed?: boolean;

  dueDate?: Date;
  alarmDate?: Date;

  locationName?: string;
  longitude?: number;
  latitude?: number;

  index?: number;
}

export const extractTodoCreationParams = (data: any) => {
  const keys: (keyof TodoCreationParams)[] = [
    'title',
    'description',

    'done',
    'alarmed',

    'dueDate',
    'alarmDate',

    'locationName',
    'longitude',
    'latitude',

    'index',
  ];

  const todoCreationParams: TodoCreationParams = {};

  for (const key of keys) {
    if (data[key]) {
      todoCreationParams[key] = data[key];
    }
  }

  return todoCreationParams;
};
