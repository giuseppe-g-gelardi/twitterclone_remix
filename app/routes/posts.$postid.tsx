import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

// import type { Post } from "./api/models/post.models"
import type { User } from "./api/models/user.models"

import { getSinglePost } from "./api/posts.server"
import { getUser } from "./api/session.server"
import Feed from "./components/Feed"
import PostBox from "./components/PostBox"
import Sidebar from "./components/Sidebar"
// import SuggestedUsers from "./components/SuggestedUsers"

import Icons from "./components/Icons"
import { fetchComments } from "./api/comments.server"
import { findPublicUsers } from "./api/user.server"
import SuggestedUsers from "./components/SuggestedUsers"

export const loader: LoaderFunction = async ({ params, request }: any) => {
  const publicUsers: User[] = await findPublicUsers()
  const post = await getSinglePost(params.postid)
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user

  async function getCommentsFeed(commentsArray: any) {
    try {
      let postFeed = []
      for (let comment of commentsArray) {
        const item = await fetchComments(comment)
        postFeed.push(item)
      }
      return postFeed

    } catch (error: any) {
      throw new Error(error)
    }
  }
  const comments = await getCommentsFeed(post.comments)

  return { post, loggedInUser, comments, publicUsers }
}


export default function SinglePostPage() {
  const { post, comments } = useLoaderData()

  return (
    <div className="font-sans flex place-content-center">

      <div className="col-span-3">
        <Sidebar />
      </div>

      <div className="col-span-6 m-auto w-full">

        <div className="px-5 my-2 flex">
          <button
            onClick={() => history.back()}
            className="flex font-bold p-1 mr-5"
          >
            {Icons.backButton}
          </button>
          <h1 className="flex font-bold text-xl">
            Post
          </h1>
        </div>
        <div className="border-b-2">

          <Feed
            feed={post}
            user={post.user}
          />
        </div>
        <div className="mt-2.5">

          <PostBox />
          {comments.map((comment: { _id: any; user: any }) => (
            <Feed
              key={comment._id}
              feed={comment}
              user={comment.user}
            />
          ))}
        </div>
      </div>


      <div className="col-span-3 place-content-center">
        <SuggestedUsers />
      </div>

    </div>
  )
}
