// import { useLoaderData } from "@remix-run/react";
import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";
import SuggestedUsers from '~/routes/components/SuggestedUsers'
import UserProfileHeader from "./components/UserProfileHeader";
import type { LoaderFunction } from "@remix-run/node";
import type { User } from "./api/models/user.models";
import { getUserPosts } from "./api/posts.server";
import { useLoaderData } from "@remix-run/react";
import PostCard from "./components/PostCard";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const username = loggedInUser?.username
  const posts = await getUserPosts(username)


  return { publicUsers, data, loggedInUser, posts }
}

export default function HomePage() {
  // const data = useLoaderData()
  const { posts } = useLoaderData()


  // const loggerbutton = (
  //   <button
  //   className="bg-violet-400 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
  //   onClick={() => console.log(posts)}
  // >
  //   home loader logger
  // </button>
  // )

  return (
      <div className="p-16 font-sans flex">

        <div>
          <SuggestedUsers />
        </div>

        <div>
          <UserProfileHeader />
          {posts
          .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((post: any) => (
            <PostCard
            key={post._id}
            post={post}
            />
            ))}
        </div>

        <div>
          3rd column
        </div>

      </div>
  )
}

