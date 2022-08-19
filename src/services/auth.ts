import User from '@/models/user';

export const register = async (username: string, password: string) => {
  const exUser = await User.findOne({
    username,
  });

  if (exUser) {
    throw `${username} already exists`;
  }

  const user = new User({ username });

  return await User.register(user, password);
};
