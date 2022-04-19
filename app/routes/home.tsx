import { Link, useLoaderData } from "@remix-run/react";
import { findPublicUsers } from "./api/user.server";
import type { LoaderFunction } from "@remix-run/node";
import type { User } from "./api/models/user.models";

export const loader: LoaderFunction = async () => {
  const publicUsers: User[] = await findPublicUsers()

  return { publicUsers }
}

export default function SearchTest() {
  const { publicUsers } = useLoaderData()
  return (
    <div>
      <h1>ayo</h1>
      <button
        onClick={() => console.log(publicUsers)}
      >
        logger
      </button>
      {publicUsers && (
        <div>
          <ul>
            {publicUsers.map((user: any) => (
              <li key={user._id}>
                <Link to={`/${user.username}`}>
                  {user.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

