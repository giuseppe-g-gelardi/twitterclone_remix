import type { Post } from "./models/post.models";

export async function getUserPosts(username: string | undefined): Promise<Post> {
  const response = await fetch(`http://localhost:8000/api/posts/${username}/posts`)
  const userPosts = response.json()

  return userPosts
}

export async function getSinglePost(postid: string | undefined) {
  const response = await fetch(`http://localhost:8000/api/posts/${postid}`)
  const post = response.json()

  return post
}
