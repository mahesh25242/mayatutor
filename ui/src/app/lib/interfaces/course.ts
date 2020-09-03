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
  user?: User
}
