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
  course_module_count?: number
}


export interface CourseModule {
  id?: number,
  course_id?: number,
  name?: string,
  pdf?: number,
  video_url?: string,
  status?: number,
  live_class?: number,
  sort_order?: number,
  course: Course
}
