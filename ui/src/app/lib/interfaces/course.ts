import { courseApprovalRequest } from './courseApprovalRequest';
import { CourseTag } from './courseTag';
import { Pagination } from './pagination';
import { StudentCourse } from './student-course';
import { StudentCourseModuleTrack } from './student-course-module-track';
import { StudentCourseTrack } from './student-course-track';
import { User } from './user';

export interface Course {
  id?: number,
  user_id?: number,
  name?: string,
  price?: number,
  demo_video_url?: string,
  image?: string,
  description?: string,
  status?: number,
  live_class?: number,
  live_class_url?: string,
  news?: string,
  user?: User,
  course_module_count?: number,
  course_tag?: CourseTag[],
  latest_course_approval_request?: courseApprovalRequest,
  course_module?: CourseModule[],
  is_course_completed: StudentCourseTrack,
  message?: string
}


export interface CourseModule {
  id?: number,
  course_id?: number,
  name?: string,
  pdf?: string,
  video_url?: string,
  status?: number,
  live_class?: number,
  sort_order?: number,
  course?: Course,
  video_type?: string,
  thumb_image?: string,
  file1?: string,
  file2?: string,
  logged_student_course?: StudentCourse,
  is_module_completed_count?: number,
  is_module_completed?: StudentCourseModuleTrack,
  message?: string
}

export interface CourseWithPagination extends Pagination {
  data?: Course[]
}
