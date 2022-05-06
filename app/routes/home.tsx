import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { ShouldReloadFunction} from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { User } from "./api/models/user.models";
import type { Post } from "./api/models/post.models";

import {
  createNewPost,
  getUserPosts,
  likeUnlikePost,
} from "./api/posts.server";
import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";

import PostBox from "./components/PostBox";
import Feed from "./components/Feed";
import Layout from "./components/Layout";

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

  return { data, loggedInUser, posts, feed, getFeed, publicUsers }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const body = form.get('body')
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const username = loggedInUser?.username
  const { _action } = Object.fromEntries(form)
  const postid = form.get('like') as string

  if (_action === 'like') return likeUnlikePost(user?._id, postid)

  const newPost: Post = await createNewPost(username, body)

  return newPost
}

export const unstable_shouldReload: ShouldReloadFunction =
  ({
    submission,
  }) => {
    console.log('submission: ', submission)
    // return !!submission && submission.action !== "/home";
    return true
  }

type LoaderData = {
  feed: Post[],
  loggedInUser: User
}

export default function HomePage() {
  const { feed, loggedInUser } = useLoaderData<LoaderData>()

  return (
    <Layout>
      <div className="px-5 my-2 flex">
        <h1 className="flex font-bold text-xl">
          Home
        </h1>
        <h2 className="font-bold text-lg ml-auto hover:bg-sky-200 hover:rounded-full p-1">
          <Link to={`/${loggedInUser.username}`}>
            View your profile
          </Link>
        </h2>
      </div>

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

    </Layout>
  )
}

