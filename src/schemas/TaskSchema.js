const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    color: 'string',
    mode: 'int',
    done: 'bool',
    icon: 'string',
    pomodoro: 'string',
    filter: 'Filter',
    soundYear: 'int',
    soundMonth: 'int',
    soundDay: 'int',
    soundHour: 'int',
    soundMinute: 'int',
    subtasks: {type: 'list', objectType: 'Subtask'},
  },
};

const SubtaskSchema = {
  name: 'Subtask',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    done: 'bool',
  },
};

const FilterSchema = {
  name: 'Filter',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
  },
};

export {TaskSchema, SubtaskSchema, FilterSchema};
