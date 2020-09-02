import { City } from './city';
import { Country } from './country';
import { State } from './state';
import { Role } from './role';
import { TeacherPaymentInfo } from './teacherPaymentInfo';

export interface UserLogin {
  id?: number,
  name?: string,
  created_at?: string,
  updated_at?: string,
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
  teacher_payment_info?: TeacherPaymentInfo
}
