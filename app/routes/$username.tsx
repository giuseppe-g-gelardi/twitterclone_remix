import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { findByUsername } from "./api/user.server";

export const loader: LoaderFunction = async ({ params }: any) => {
  const user = await findByUsername(params)
  
  return { user }
}

export default function UserPage() {
  const { user } = useLoaderData()
  return (
    <div>
      <h1>hi {user.username}</h1>
      <button
        onClick={() => console.log(user)}
      >
        logger
      </button>
    </div>
  )
}




  // const request = await getUserByUsername(params)
  // const user = request.data
