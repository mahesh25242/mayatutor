import { ThreadMessage } from './thread-message';
import { User } from '../../../lib/interfaces';
import { Thread } from './thread';

export interface Partisipant {
  id?: number,
  thread_id?: number,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  last_read?: string,
  starred?: boolean,
  user?: User,
  user_id?: number,
  thread: Thread
}
