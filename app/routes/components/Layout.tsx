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
import BottomNav from "./BottomNav";

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

  if (_action === 'update') return updateUserProfile(loggedInUser?.username, { ...values })
}

type Proptype = {
  children: ReactNode,
}

export default function Layout({ children }: Proptype) {

// Helvetica Neue
  return (
    <div className="font-helvetica flex place-content-center">

        <div className="p-0 sm:px-2 md:px-3 col-span-3 place-content-right ml-auto hidden sm:block ">
          <Sidebar />
        </div>


      <div className="">
        <div className="col-span-3 border-0 sm:border-2 md:col-span-2 border-gray-500 w-full min-w-full max-w-[598px]">
          {children}
        </div>
        <div className="col-span-3 border-0 border-gray-500 w-full fixed bottom-0 sm:invisible sm:block md:col-span-2 max-w-[598px]">
          <BottomNav />
        </div>
      </div>


        <div className="col-span-3 mr-auto pl-4 sm:pl-5 place-content-left hidden sm:block">
          <SearchBar />
          <SuggestedUsers />
        </div>



    </div>
  )
}
