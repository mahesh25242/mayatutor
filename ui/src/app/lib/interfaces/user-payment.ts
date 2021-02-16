import { Course } from './course';
import { User } from './user';

export interface UserPayment {
  id?: number,
  user_id?: number,
  course_id?: number,
  amount?: number,
  method?: string,
  start_date?: string,
  end_date?: string,
  doc?: string,
  created_at?: string,
  course?: Course,
  user?: User
}
