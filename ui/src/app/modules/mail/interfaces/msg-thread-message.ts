import { MsgThread } from "./msg-thread";
import { User } from "../../../lib/interfaces";

export interface MsgThreadMessage {
 id?: number,
 thread_id?: number,
 user_id?: number,
 body?: string,
 created_at?: string,
 updated_at?: string,
 deleted_at?: string,
 thread?: MsgThread,
 User?: User
}
