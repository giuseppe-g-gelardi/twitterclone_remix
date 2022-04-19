import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { publicUserSearch } from "./models/user.server";

export const loader: LoaderFunction = async () => {
  const publicUsers = await (await publicUserSearch()).data

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

