import { User } from '@/users/user';
import { Todo } from '@/todos/todo';

export const define = () => {
  User.hasMany(Todo, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'todos',
  });
};
