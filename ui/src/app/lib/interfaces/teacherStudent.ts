
import { User } from './user';
import { Pagination } from './pagination';

export interface TeacherStudent {
  id?: number,
  teacher_user_id?: number,
  user_id?: number,
  student?: User,
  teacher?: User,
  status?: number,
  created_at?: string,
  created_at_human?: string
}
export interface TeacherStudentWithPagination extends Pagination {
  data?: User[]
}
