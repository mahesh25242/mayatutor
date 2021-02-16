import { StudentCourseModuleTrack } from './student-course-module-track';

export interface StudentCourseTrack {
  id?: number,
  user_id?: number,
  course_id?:number,
  created_at?: string,
  updated_at?: string,
  student_course_module_track?: StudentCourseModuleTrack[]
}
