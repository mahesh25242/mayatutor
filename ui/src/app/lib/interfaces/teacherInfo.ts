import { Education } from './education';
import { User } from './user';

export interface TeacherInfo {
  id?: number,
  user_id?: number,
  experiance?: string,
  time?: string,
  fees?: string,
  education_id?: number,
  other?: string,
  education?: Education,
  user?: User
}

export interface TeacherBannerImg {
  id?: number,
  user_id?: number,
  title?: string,
  img?: string,
  user?: User
}
