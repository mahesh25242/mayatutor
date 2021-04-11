import { User } from './user';
export interface Rating {
  id?: number,
  user_id?: number,
  updated_by?: number,
  created_at?: string
  created_by?: number,
  deleted_at?: string,
  deleted_by?: number,
  rate?: number,
  tot_users?: number,
  updated_at?: string,
  user?: User,
  rating_tran?: RatingTran[],
  myrating_tran?: RatingTran
}

export interface RatingTran {
  id?: number,
  rating_id?: number,
  user_id?: number,
  rate?: number,
  updated_at?: string,
  user?: User,
  rating?: Rating
}
