import { City } from './city';
import { Country } from './country';
import { State } from './state';
import { Role } from './role';
import { TeacherPaymentInfo } from './teacherPaymentInfo';
import { Subject } from './subject';
import { TeacherInfo, TeacherBannerImg } from './teacherInfo';
import { Rating } from './rating';
import { Pagination } from './pagination';
import { TeacherStudent } from './teacherStudent';
import { Plan, PlanPurchase } from './plan';

export interface UserLogin {
  id?: number,
  name?: string,
  created_at?: string,
  updated_at?: string,
  created_at_human?: string
}

export interface UserPlan {
  id?: number,
  plan_id?: number,
  remaining_days?: number,
  user_id?: number,
  start_date?: string,
  created_at?: string,
  updated_at?: string,
  end_date?: string,
  plan?: Plan,
  plan_purchase_id?: number,
  plan_purchase?: PlanPurchase
}

export interface User {
  id?: number,
  fname?: string,
  mname?: string,
  lname?: string,
  status?: number,
  email?: string,
  passeord?: string,
  phone?: string,
  address?: string,
  country_id?: number,
  country?: Country,
  state_id?: number,
  state?: State,
  city_id?: number,
  city?: City,
  pin?: string,
  role?: Role[],
  created_at?: string,
  updated_at?: string,
  created_by?: number,
  updated_by?: number,
  role_url?: string,
  last_login?:UserLogin,
  avatar?: string,
  url?: string,
  teacher_payment_info?: TeacherPaymentInfo,
  subject?: Subject[],
  teacher_info?: TeacherInfo,
  teacher_banner?: TeacherBannerImg,
  rating?: Rating,
  current_user_plan?: UserPlan,
  next_user_plan?: UserPlan,
  student_count?: number,
  created_at_human?: string,
  course_count?: number,
  teacher_auto_approval_count?: number,
  student_course_count?: number,
  student?: TeacherStudent,
  is_online?: boolean,
  is_able?: boolean
}
export interface UserWithPagination extends Pagination {
  data?: User[]
}
