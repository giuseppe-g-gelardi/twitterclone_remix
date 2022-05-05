import { useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import {
  findByUsername,
  findPublicUsers,
  updateUserProfile
} from "./api/user.server";
import type { User } from "./api/models/user.models";
import type { Post } from "./api/models/post.models";
import { getUserPosts } from "./api/posts.server";
import { getUser } from "./api/session.server";

import ProfileHeader from "./components/ProfileHeader";
import Feed from "./components/Feed";
import BackButton from "./components/BackButton";
import Layout from "./components/Layout";

export const loader: LoaderFunction = async ({ params, request }: any) => {
  const publicUsers: User[] = await findPublicUsers()
  const user: User = await findByUsername(params)
  const posts: Post[] = await getUserPosts(user.username)
  const sessionUser: User | null = await getUser(request)
  const data = { sessionUser }
  const loggedInUser = data.sessionUser

  return { user, posts, publicUsers, loggedInUser }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const { _action, ...values } = Object.fromEntries(form)

  if (_action === 'update') return updateUserProfile(loggedInUser?.username, { ...values })

  if (!_action) return null
}

type LoaderData = {
  user: User,
  posts: Post[]
}

export default function UserPage() {
  const { posts, user } = useLoaderData<LoaderData>()
  return (
    <Layout>

      <BackButton
        text={user.username}
      />

      <ProfileHeader />
      {posts
        .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
        .map((post: any) => (
          <Feed
            key={post._id}
            feed={post}
            user={user}
          />
        ))}

    </Layout>
  )
}
