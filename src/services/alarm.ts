import Alarm from '@/models/alarm';

export const createAlarm = async (userId: any, todoId: any) => {
  await Alarm.create({ userId, todoId });
};

export const deleteAlarm = async (id: any) => {
  const result = await Alarm.findOneAndDelete({
    todoId: id,
  });
  return result;
};
