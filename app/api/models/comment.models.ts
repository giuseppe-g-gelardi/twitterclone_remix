import type { User } from "./user.models";
import type { Reply } from "./reply.models";

export interface Comment {
  _id: string,
  user: User,
  username?: string,
  body: string,
  likes?: [],
  replies?: Reply[]
  createdAt?: string,
  updatedAt?: string
}
