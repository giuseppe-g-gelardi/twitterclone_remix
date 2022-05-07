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

export async function postNewComment(postid: any, username: any, body: any) {
// http://localhost:8000/api/comments/${username}/${postid}/new

const response = await fetch(`http://localhost:8000/api/comments/${username}/${postid}/new` ,{
    method: 'POST',
    body: JSON.stringify({ body }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const newComment = response.json()

  return newComment
}

export async function likeUnlikeComment(postid: string | undefined, commentid: string, body: string | undefined) {
  const response = await fetch(`http://localhost:8000/api/comments/${postid}/${commentid}/likes`, {
    method: 'PUT',
    body: JSON.stringify({ body }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const liked = response.json()

  return liked
}
