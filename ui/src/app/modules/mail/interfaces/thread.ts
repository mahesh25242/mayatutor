import { ThreadMessage } from './thread-message';

export interface Thread {
  id?: number,
  subject?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  messages?: ThreadMessage[],
  messages_count?: number,
  participants_count?: number
}
