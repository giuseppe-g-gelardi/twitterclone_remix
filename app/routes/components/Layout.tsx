import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { ReactNode } from "react";

import type { User } from "../api/models/user.models";
import type { Post } from "../api/models/post.models";
import { findByUsername, updateUserProfile } from "../api/user.server";
import { getUserPosts } from "../api/posts.server";
import { getUser } from "../api/session.server";

import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/SuggestedUsers";
import SearchBar from "../components/SearchBar";

export const loader: LoaderFunction = async ({ params, request }: any) => {
  const user: User = await findByUsername(params)
  const posts: Post[] = await getUserPosts(user.username)
  const sessionUser: User | null = await getUser(request)
  const data = { sessionUser }
  const loggedInUser = data.sessionUser

  return { user, posts, loggedInUser }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const { _action, ...values } = Object.fromEntries(form)

  if (_action === 'update') return updateUserProfile(loggedInUser?.username, {...values})
}

type Proptype = {
  children: ReactNode,
}

export default function Layout({ children }: Proptype) {

  return (
    <div className=" font-sans flex place-content-center">

      <div className="col-span-3">
        <Sidebar />
      </div>

      <div className="col-span-6 border-2 border-gray-500 w-full" >
        {children}
      </div>

      <div className="col-span-3 place-content-center">
        <SearchBar />
        <SuggestedUsers />
      </div>

    </div>
  )
}
