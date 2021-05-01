import { User, UserPlan } from './user';

export interface Plan {
  id?: number,
  name?: string,
  description?: string,
  features?: any,
  price?: number,
  my_user_plan?: UserPlan
}

export interface PlanPurchase {
  id?: number,
  user_id?: number,
  plan_id?: number,
  amount?: number,
  discount?: number,
  status?: number,
  tran_no?: string,
  log?: string,
  tax?: number,
  plan?: Plan,
  user?: User,
  user_plan?: UserPlan
}
