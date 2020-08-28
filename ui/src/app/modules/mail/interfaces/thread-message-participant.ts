import { Thread } from "./thread";
import { User } from "../../../lib/interfaces";

export interface ThreadMessageParticipant {
  id?: number,
  thread_id?: number,
  user_id?: number,
  last_read?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  thread?: Thread,
  User?: User
}
