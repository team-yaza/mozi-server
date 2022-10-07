import { z } from 'zod';

export const uuidValidator = (id: string) => {
  const uuidSchema = z.string().uuid();

  const { success } = uuidSchema.safeParse(id);

  return success;
};
