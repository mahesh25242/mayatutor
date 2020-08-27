import { MsgThreadMessage } from './msg-thread-message';

export interface MsgThread {
  id?: number,
  subject?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  messages?: MsgThreadMessage[]
}
