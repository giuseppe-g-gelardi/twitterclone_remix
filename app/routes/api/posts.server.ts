import type { Post } from "./models/post.models";

export async function getUserPosts(username: string | undefined): Promise<Post[]> {
  const response = await fetch(`http://localhost:8000/api/posts/${username}/posts`)
  const userPosts = response.json()

  return userPosts
}

export async function getSinglePost(postid: string | undefined): Promise<Post> {
  const response = await fetch(`http://localhost:8000/api/posts/${postid}`)
  viewCount(postid)
  const post = response.json()

  return post
}

export async function createNewPost(username: string | undefined, body: any) {
  const response = await fetch(`http://localhost:8000/api/posts/${username}`, {
    method: 'PUT',
    body: JSON.stringify({ body }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const newPost = response.json()

  return newPost
}

export async function likeUnlikePost(userid: string | undefined, postid: string | undefined) {
  const response = await fetch(`http://localhost:8000/api/posts/${postid}/likes`, {
    method: 'PUT',
    body: JSON.stringify({ userid }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  // console.log('api route response: ', response)
  const liked = response.json()

  return liked
}

// http://localhost:8000/api/posts/${postid}/views
export async function viewCount(postid: string | undefined) {
  const response = await fetch(`http://localhost:8000/api/posts/${postid}/views`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const viewCount = response.json()

  return viewCount
}
