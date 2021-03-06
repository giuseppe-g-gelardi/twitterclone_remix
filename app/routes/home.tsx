import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { User } from "../api/models/user.models";
import type { Post } from "../api/models/post.models";

import {
  createNewPost,
  getUserPosts,
  likeUnlikePost,
} from "../api/posts.server";
import { getUser } from "../api/session.server";
import { findPublicUsers } from "../api/user.server";

import PostBox from "../components/PostBox";
import Feed from "../components/Feed";
import Header from "../components/Header";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data?.user
  const username = loggedInUser?.username
  const posts = await getUserPosts(username)
  const following: string[] | undefined = loggedInUser?.following

  async function getFeed(users: string[] | undefined, userPosts: ConcatArray<Post>) {
    try {

      const userFeed = []
      
      if (!users) return;
      for (const element of users) {
        const item = await getUserPosts(element)
        // if (!item) return;
        userFeed?.push(...item)
      }

      return userFeed?.concat(userPosts)
    } catch (error: unknown) {
      throw new Error(error as string | undefined)
    }
  }
  const feed = await getFeed(following, posts)

  if (!user) return redirect('/')

  return { loggedInUser, posts, feed, getFeed, publicUsers }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data?.user
  const username = loggedInUser?.username

  const { _action } = Object.fromEntries(form)
  const body = form.get('body') as string
  const postid = form.get('like') as string

  if (_action === 'like') return likeUnlikePost(user?._id, postid)
  if (_action === 'post') return createNewPost(username, body)
}

type LoaderData = {
  feed: Post[],
  loggedInUser: User
}

export default function HomePage() {
  const { feed, loggedInUser } = useLoaderData<LoaderData>()

  return (
    <div className="sm:min-w-[598px] sm:max-w-[598px]">
      <Header loggedInUser={loggedInUser} />
      <PostBox
        postValue='post'
      />

      {feed && (feed?.sort((a, b) => new Date(b?.createdAt).valueOf() - new Date(a?.createdAt).valueOf())
        .map((postFeed) => (
          <Feed
            key={postFeed?._id}
            feed={postFeed}
            user={postFeed?.user}
            inputName='like'
            buttonValue='like'
            replies={null}
          />
        ))
      )}
    </div>
  )
}

