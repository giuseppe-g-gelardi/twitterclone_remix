// http://localhost:8000/
// api/comments

// import type { Reply } from "./models/reply.models"

// http://localhost:8000/api/replies/627db3cf7012edf1ef9e8071/replies
// http://localhost:8000/api/replies/627e7c32328ae0b4f730b0ae/replies

export async function getCommentReplies(commentid: string) { 
  const response = await fetch(`http://localhost:8000/api/replies/${commentid}/replies`)
  const replies = response.json()

  return replies
}
