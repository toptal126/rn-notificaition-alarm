import Realm from 'realm';

import {TaskSchema, SubtaskSchema, FilterSchema} from '../schemas/TaskSchema';
import {RoutineSchema} from '../schemas/RoutineSchema';
import {
  CourseSchema,
  FlashCardSchema,
  NotificationStudySchema,
  RepetitionTimeSchema,
  PomodoroSchema,
  ExamsSchema,
  NotificationsExamsSchema,
} from '../schemas/CourseSchema';

export default function getRealm() {
  return Realm.open({
    schema: [
      TaskSchema,
      RoutineSchema,
      SubtaskSchema,
      CourseSchema,
      FlashCardSchema,
      NotificationStudySchema,
      RepetitionTimeSchema,
      PomodoroSchema,
      ExamsSchema,
      NotificationsExamsSchema,
      FilterSchema,
    ],
    schemaVersion: 1,
  });
}
