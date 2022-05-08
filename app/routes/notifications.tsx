import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { User } from "./api/models/user.models";
import { getSinglePost } from "./api/posts.server";
import { getUser } from "./api/session.server";
import { findByUsername, findPublicUsers } from "./api/user.server";
import Layout from "./components/Layout";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user

  return { publicUsers, loggedInUser }
}

export default function NotificationsPage() {
  const { loggedInUser } = useLoaderData()
  return (
  <Layout>
    <h1>notifications page</h1>
    <button className="bg-indigo-500" onClick={() => console.log(loggedInUser.notifications)}>
      logger
    </button>
  </Layout>
  )
}
