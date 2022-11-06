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

export interface TodoUpdateParams extends TodoCreationParams {
  [key: string]: any;
  deletedAt?: Date | null;
}
