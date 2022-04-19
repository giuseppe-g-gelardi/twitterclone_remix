import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserByUsername } from "./models/user.server";

export const loader: LoaderFunction = async ({ params }: any) => {
  const user = await (await getUserByUsername(params)).data
  
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
