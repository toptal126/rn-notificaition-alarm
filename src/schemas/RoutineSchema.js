const RoutineSchema = {
  name: 'Routine',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    description: 'string',
    colorPosition: 'int',
    public: 'bool',
    tasks: {type: 'list', objectType: 'Task'},
  },
};

export {RoutineSchema};
