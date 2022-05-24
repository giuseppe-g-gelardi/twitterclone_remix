import type { User } from "./user.models";

export interface Comment {
  _id: string,
  user: User,
  username?: string,
  body: string,
  likes?: [],
  parent?: Comment,
  replies?: Comment[]
  createdAt?: string,
  updatedAt?: string
}
