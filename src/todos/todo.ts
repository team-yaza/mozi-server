export interface TodoCreationParams {
  title?: string;
  description?: string;

  done?: boolean;
  alarmed?: boolean;

  dueDate?: Date;
  alarmDate?: Date;

  locationName?: string;
  longitude?: number;
  latitude?: number;

  index?: number;
}

export interface TodoSyncParams extends TodoCreationParams {
  deletedAt?: null;
}
