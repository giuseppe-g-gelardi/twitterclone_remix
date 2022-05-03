import type { User } from "./models/user.models"

export interface Comment {
  _id: string,
  user: User,
  username?: string,
  body: string,
  likes?: string[]
  parent?: Comment
  replies?: Comment[]
}

export async function fetchComments(commentid: any) {
  const response = await fetch(`http://localhost:8000/api/comments/${commentid}`)
  const comment = response.json()

  return comment
}


// http://localhost:8000/api/comments/${username}/${postid}/comments/${commentid}
