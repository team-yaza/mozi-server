import User from '@/models/user';
import bcrypt from 'bcrypt';

export const register = async (email: string, password: string) => {
  const exUser = await User.findOne({
    email,
  });

  if (exUser) {
    throw `${email} already exists`;
  }

  const user = new User({ email });
  const hash = await bcrypt.hash(password, 12);

  return await User.register(user, hash);
};
