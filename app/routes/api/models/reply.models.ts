import type { User } from "./user.models";

export interface Reply {
  _id: string,
  user: User,
  username: User,
  body: string,
  likes?: string[],
  createdAt?: string,
  updatedAt?: string
}
