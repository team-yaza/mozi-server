import { User } from '@/users/user';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
