import { User } from './user';
import { Course } from './course';

export interface StudentCourse {
  id?: number,
  course_id?: number,
  created_at?:string,
  status?: number,
  user_id?: number,
  user?: User,
  status_text?: string,
  course?: Course
}
