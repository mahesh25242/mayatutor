import { ThreadMessage } from './thread-message';
import { Partisipant } from './partisipant';
import { User } from 'src/app/lib/interfaces';


export interface Thread {
  id?: number,
  subject?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  messages?: ThreadMessage[],
  messages_count?: number,
  participants_count?: number,
  participants?: Partisipant[],
  creator?: User,
  unread_count?: number
}
