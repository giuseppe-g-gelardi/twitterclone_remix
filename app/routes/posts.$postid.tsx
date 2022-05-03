import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { Post } from "./api/models/post.models"
import type { User } from "./api/models/user.models"

import { getSinglePost } from "./api/posts.server"
import { getUser } from "./api/session.server"
import Feed from "./components/Feed"
// import PostBox from "./components/PostBox"
import Sidebar from "./components/Sidebar"
// import SuggestedUsers from "./components/SuggestedUsers"

export const loader: LoaderFunction = async ({ params, request }: any) => {
  const post = await getSinglePost(params.postid)
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user



  return { post, loggedInUser }
}

type LoaderData = {
  post: Post,
  loggedInUser: User | null
}

// TODO: Add back button to single post page

export default function SinglePostPage() {
  const { post, loggedInUser } = useLoaderData<LoaderData>() 
  return (
    <div className="font-sans flex place-content-center">

      <div className="col-span-3">
        <Sidebar />
      </div>
  

      <div className="col-span-6">
        <button
          onClick={() => console.log(loggedInUser)}
        >
          user logger
        </button>
        <Feed 
          feed={post}
          user={post.user}
        />
        {/* <PostBox 
          loggedInUser={loggedInUser}
        /> */}
      </div>


      <div className="col-span-3 place-content-center">
        {/* <SuggestedUsers /> */}
      </div>

    </div>
  )
}
