import type { Comment } from "./comment.models";
import type { User } from "./user.models";

export interface Post {
  _id: string,
  user: User,
  username?: string,
  body: string,
  likes: [],
  comments: Comment[],
  createdAt: string,
  updatedAt: string
}
