// import { useLoaderData } from "@remix-run/react";
import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";
import SuggestedUsers from '~/routes/components/SuggestedUsers'
import UserProfileHeader from "./components/UserProfileHeader";
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
  // const { loggedInUser }: { loggedInUser: User} = useLoaderData()
  return (
      <div className="p-16 font-sans flex">
        <div>
          <SuggestedUsers />
        </div>
        <div>
          <UserProfileHeader />
        </div>
          {/* <div>
            <p className="font-bold text-center">##################</p>
              <h1 className="text-5xl font-bold text-center">Welcome Home, {loggedInUser.username}!</h1>
            <p className="font-bold text-center">##################</p>
          </div> */}
        {/* <div>
          <SuggestedUsers />
        </div> */}
      </div>
  )
}

