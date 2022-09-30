import User from './user';

interface Todo {
  id?: string;

  ownerId?: string;
  owner?: User;

  title: string;
  description: string;

  done?: boolean;
  alarmed?: boolean;

  locationName?: string;
  longitude?: number;
  latitude?: number;

  index?: number;
}

export default Todo;
