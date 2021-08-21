const CourseSchema = {
  name: 'Course',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    color: 'string',
    icon: 'string',
    flashCards: {type: 'list', objectType: 'flashCard'},
    notificationsStudy: {type: 'list', objectType: 'notificationStudy'},
    pomodoros: {type: 'list', objectType: 'Pomodoro'},
    exams: {type: 'list', objectType: 'Exams'},
  },
};

const FlashCardSchema = {
  name: 'flashCard',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    question: 'string',
    answer: 'string',
  },
};

const NotificationStudySchema = {
  name: 'notificationStudy',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    body: 'string',
    active: 'bool',
    repeat: 'int',
    repetition_time: {type: 'list', objectType: 'RepetitionTime'},
  },
};
const RepetitionTimeSchema = {
  name: 'RepetitionTime',
  primaryKey: 'id',
  properties: {
    id: 'string',
    soundYear: 'int',
    soundMonth: 'int',
    soundDay: 'int',
    soundHour: 'int',
    soundMinute: 'int',
  },
};

const PomodoroSchema = {
  name: 'Pomodoro',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    concentrationTime: 'int',
    breakTime: 'int',
    sessions: 'int',
    autoRepeatSession: 'bool',
    colorPosition: 'int',
  },
};

const ExamsSchema = {
  name: 'Exams',
  primaryKey: 'id',
  properties: {
    id: 'string',
    courseNme: 'string',
    courseTopic: 'string',
    soundYear: 'int',
    soundMonth: 'int',
    soundDay: 'int',
    soundHour: 'int',
    soundMinute: 'int',
    icon: 'string',
    notifications: {type: 'list', objectType: 'NotificationsExams'},
  },
};

const NotificationsExamsSchema = {
  name: 'NotificationsExams',
  primaryKey: 'id',
  properties: {
    id: 'string',
    soundYear: 'int',
    soundMonth: 'int',
    soundDay: 'int',
    soundHour: 'int',
    soundMinute: 'int',
  },
};

export {
  CourseSchema,
  FlashCardSchema,
  NotificationStudySchema,
  RepetitionTimeSchema,
  PomodoroSchema,
  ExamsSchema,
  NotificationsExamsSchema,
};
