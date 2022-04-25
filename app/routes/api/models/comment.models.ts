import type { User } from "./user.models";

export interface Comment {
  user: User,
  username?: string,
  body: string,
  likes?: [],
  parent?: Comment,
  replies?: Comment[]
}
