// import { useLoaderData } from "@remix-run/react";
import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";
import SuggestedUsers from '~/routes/components/SuggestedUsers'
import UserProfileHeader from "./components/UserProfileHeader";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
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

  if (!user) return redirect('/')

  return { publicUsers, data, loggedInUser, posts }
}

export default function HomePage() {
  const { posts } = useLoaderData()

  return (
    // main container
      <div className="p-16 font-sans flex">

    {/* this will be the nav/sidebar */}
        <div className="col-span-2 ml-0">
          <SuggestedUsers />
        </div>

    {/* main content. tweets, profile, etc */}
        <div className="col-span-8">
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
          
    {/* right sidebar. suggested users, first to disappear */}
        <div className="col-span-2">
          3rd column
        </div>

      </div>
  )
}

