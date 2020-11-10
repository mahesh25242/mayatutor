import { StudentCourseTrack } from './student-course-track';
export interface StudentCourseModuleTrack {
  id?: number,
  student_course_track_id?: number,
  course_module_id?:number,
  status?:number,
  status_text?:string,
  created_at?: string,
  updated_at?: string,
  student_course_track?: StudentCourseTrack
}
