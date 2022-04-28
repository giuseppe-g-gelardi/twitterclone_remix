import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { getSinglePost } from "./api/posts.server"

export const loader: LoaderFunction = async ({ params }: any) => {
  const post = await getSinglePost(params.postid)
  return { post }
}

export default function SinglePostPage() {
  const { post } = useLoaderData() 
  return (
    <div>
      SinglePostPage
      <button
        onClick={() => console.log(post)}
      >
        post logger
      </button>
      <div>
        postid: {post._id}
      </div>
      <div>
        userid: {post.user}
      </div>
      <div>
        username: {post.username}
      </div>
      <div>
        body: {post.body}
      </div>
    </div>
  )
}
