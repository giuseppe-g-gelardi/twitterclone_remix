import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { User } from "./api/models/user.models";
import type { Post } from "./api/models/post.models";
import {
  createNewPost,
  getUserPosts,
} from "./api/posts.server";
import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";

import SuggestedUsers from '~/routes/components/SuggestedUsers'
import Sidebar from "./components/Sidebar";
import PostBox from "./components/PostBox";
import Feed from "./components/Feed";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const username = loggedInUser?.username
  const posts = await getUserPosts(username)
  const following: string[] | undefined = loggedInUser?.following

  async function getFeed(users: string[] | undefined, userPosts: Post[]) {
    try {

      const userFeed: any[] = []
      for (const element of users!) {
        const item = await getUserPosts(element)
        userFeed.push(...item)
      }

      return userFeed.concat(userPosts)
    } catch (error: any) {
      throw new Error(error)
    }
  }
  const feed = await getFeed(following, posts)

  if (!user) return redirect('/')

  return { publicUsers, data, loggedInUser, posts, feed, getFeed }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const body = form.get('body')
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const username = loggedInUser?.username

  const newPost: Post = await createNewPost(username, body)

  return newPost
}
export default function HomePage() {
  const { feed } = useLoaderData()

  return (
    // main container
    <div className="font-sans flex place-content-center">

      <div className="col-span-3">
        <Sidebar />
      </div>

      {/* main content. tweets, profile, etc */}
      <div className="col-span-6">

        <PostBox />

        {feed
          .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((postFeed: any) => (
            <Feed
              key={postFeed._id}
              feed={postFeed}
              user={postFeed.user}
            />
          ))
        }
      </div>

      {/* right sidebar. suggested users, first to disappear */}
      <div className="col-span-3 place-content-center">
        <SuggestedUsers />
      </div>

    </div>
  )
}

