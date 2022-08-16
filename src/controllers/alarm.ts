import { Request, Response } from 'express';

import { findAllAlarms } from '@/services/alarm';

export const getAllAlarmHandler = async (req: Request, res: Response) => {
  const userId = '313233343536373839303131'; // JWT에서 유저 아이디 가져오기
  const alarms = await findAllAlarms(userId);
  res.status(200).json(alarms);
};
