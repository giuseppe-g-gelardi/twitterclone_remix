import { useLoaderData } from "@remix-run/react";
import SuggestedUsers from '~/routes/components/SuggestedUsers'
import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";
import type { LoaderFunction } from "@remix-run/node";
import type { User } from "./api/models/user.models";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user = await getUser(request)
  const data = { user }
  const loggedInUser = data.user

  return { publicUsers, data, loggedInUser }
}

export default function HomePage() {
  const { loggedInUser }: { loggedInUser: User} = useLoaderData()
  return (
      <div>
        <p>##################</p>
          <h1>Welcome Home, {loggedInUser.username}!</h1>
        <p>##################</p>
        <div>
          <SuggestedUsers />
        </div>
      </div>
  )
}

