// http://localhost:8000/
// api/comments

// import type { Reply } from "./models/reply.models"

// http://localhost:8000/api/replies/627db3cf7012edf1ef9e8071/replies
// http://localhost:8000/api/replies/627e7c32328ae0b4f730b0ae/replies

// use this for single comment page/thread
export async function getCommentReplies(commentid: string) { 
  const response = await fetch(`http://localhost:8000/api/replies/${commentid}/replies`)
  const replies = response.json()

  return replies
}

// use this for mapping replies
export async function getReplies(replyid: string | null) {
  const response = await fetch(`http://localhost:8000/api/replies/${replyid}`)
  const replies = response.json()

  return replies
}

export async function newReply({ commentid, user, body }: any) {
  const response = await fetch(`http://localhost:8000/api/replies/${commentid}/new`, {
    method: 'PUT',
    body: JSON.stringify({ user, body }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const newReply = response.json()

  return newReply
}

export async function likeUnlikeReply(replyid: string, userid: string | undefined) {
  const response = await fetch(`http://localhost:8000/api/replies/${replyid}/likes`, {
    method: 'PUT',
    body: JSON.stringify({userid}),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const newLike = response.json()

  return newLike
}
