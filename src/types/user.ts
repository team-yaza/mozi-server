import Todo from './todo';

interface User {
  id?: string;

  name: string;
  email: string;
  password?: string;

  todos?: Todo[];

  thumbnailImage?: string;
  profileImage?: string;
}

export default User;
