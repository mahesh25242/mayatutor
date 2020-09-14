import { UserPlan } from './user';

export interface Plan {
  id?: number,
  name?: string,
  description?: string,
  features?: any,
  price?: number,
  my_user_plan?: UserPlan
}
