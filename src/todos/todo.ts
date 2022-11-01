import Todo from '@/models/todo';

export type TodoCreationParams = Partial<
  Pick<
    Todo,
    | 'title'
    | 'description'
    | 'done'
    | 'alarmed'
    | 'dueDate'
    | 'alarmDate'
    | 'locationName'
    | 'longitude'
    | 'latitude'
    | 'index'
  >
>;
