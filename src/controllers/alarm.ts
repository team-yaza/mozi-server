import { Request, Response } from 'express';

import { findAllAlarms } from '@/services/alarm';

export const getAllAlarmHandler = async (req: Request, res: Response) => {
  const alarms = await findAllAlarms(req.params.id);
  res.status(200).json(alarms);
};
