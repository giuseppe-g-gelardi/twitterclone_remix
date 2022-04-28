import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { 
  findByUsername,
  findPublicUsers 
} from "./api/user.server";
import type { User } from "./api/models/user.models";
import type { Post } from "./api/models/post.models";
import { getUserPosts } from "./api/posts.server";
import ProfileHeader from "./components/ProfileHeader";
import UserPostCard from './components/UserPostCard'
import Sidebar from "./components/Sidebar";
import SuggestedUsers from "./components/SuggestedUsers";
import SearchBar from "./components/SearchBar";

export const loader: LoaderFunction = async ({ params }: any) => {
  const publicUsers: User[] = await findPublicUsers()
  const user: User = await findByUsername(params)
  const posts: Post[] = await getUserPosts(user.username)
  
  return { user, posts, publicUsers }
}

export default function UserPage() {
  const { posts } = useLoaderData()
  return (
    <div className=" font-sans flex place-content-center">
      <div className="col-span-3">
        <Sidebar />
      </div>

      <div className="col-span-6 border-2 mt-12" >
      <ProfileHeader />
      {posts
          .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((post: any) => (
            <UserPostCard
            key={post._id}
            post={post}
            />
            ))}
      </div>
      <div className="col-span-3 place-content-center">
        <SearchBar />
        <SuggestedUsers />
      </div>
    </div>
  )
}
