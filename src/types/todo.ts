import User from './user';

interface Todo {
  id?: string;

  userId?: string;
  owner?: User;

  title: string;
  description: string;

  done?: boolean;
  alarmed?: boolean;

  dueDate?: Date;
  alarmDate?: Date;

  locationName?: string;
  longitude?: number;
  latitude?: number;

  index?: number;
}

export default Todo;
