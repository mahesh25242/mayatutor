import { Pagination } from '../../../lib/interfaces';
export interface Coupon {
  id?: number,
  role_id?: number,
  coupon_group_id?: number,
  code?: string,
  description?: string,
  no_use?: number,
  type?: string,
  value?: string,
  start_date?: string,
  end_date?: string,
  status?: number
  coupon_group?: CouponGroup,
  end_date_arr?: Object,
  start_date_arr?: Object
}

export interface CouponGroup {
  id?: number,
  name?: string,
  no_of_coupon?: number,
  created_by?: string,
  coupon?: Coupon[]
}

export interface CouponWithPagination extends Pagination {
  data?: Coupon[]
}
