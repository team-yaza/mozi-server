import Alarm from '@/models/alarm';

export const createAlarm = async (userId: any, todoId: any) => {
  await Alarm.create({ userId, todoId });
};
