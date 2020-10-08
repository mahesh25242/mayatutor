import {  Course } from './course';
export interface courseApprovalRequest {
  id?: number,
  course_id?: number,
  status?: number,
  status_text?: string,
  created_at?: string,
  updated_at?: string,
  course?: Course
}
