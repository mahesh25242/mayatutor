import { Subject } from './subject';
import { User } from './user';

export interface TeacherSubject {
  id?: number,
  user_id?: number,
  subject_id?: number,
  subject?: Subject,
  user?: User
}
