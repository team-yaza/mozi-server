import User from '@/models/user';

export const register = async (email: string, password: string) => {
  const exUser = await User.findOne({
    email,
  });

  if (exUser) {
    throw `${email} already exists`;
  }

  const user = new User({ email });

  return await User.register(user, password);
};
