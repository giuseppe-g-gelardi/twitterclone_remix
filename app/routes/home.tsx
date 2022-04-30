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
// import PostCard from "./components/PostCard";
import Sidebar from "./components/Sidebar";
import PostBox from "./components/PostBox";
import HomeFeed from "./components/HomeFeed";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const username = loggedInUser?.username
  const posts = await getUserPosts(username)


  async function getFeed(users: any, userPosts: Post[]) {
    const userFeed = []

    for (const element of users) {
      const item = await getUserPosts(element)
      userFeed.push(...item)
    }
    return userFeed.concat(userPosts)
  }
  const feed = await getFeed(loggedInUser?.following, posts)


  if (!user) return redirect('/')

  return { publicUsers, data, loggedInUser, posts, feed }
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
  // const { posts, feed } = useLoaderData()
  const { feed } = useLoaderData()

  return (
    // main container
    <div className="font-sans flex place-content-center">

      <div className="col-span-3">
        <Sidebar />
      </div>




      {/* main content. tweets, profile, etc */}
      <div className="col-span-6">
        {/* <UserProfileHeader /> */}
        {/* create unique post box for home page */}
        <PostBox />

        {feed
          .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((postFeed: any) => (
            <HomeFeed 
              key={postFeed._id}
              feed={postFeed}
              user={postFeed.user}
            />
          ))
        }
        {/* {posts
          .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((post: any) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))} */}
      </div>




      {/* right sidebar. suggested users, first to disappear */}
      <div className="col-span-3 place-content-center">
        <SuggestedUsers />
      </div>

    </div>
  )
}

