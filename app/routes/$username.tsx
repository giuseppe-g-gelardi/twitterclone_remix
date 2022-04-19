import { useLoaderData } from "@remix-run/react";
import { findByUsername } from "./api/user.server";
import type { LoaderFunction } from "@remix-run/node";
import type { User } from "./api/models/user.models";

export const loader: LoaderFunction = async ({ params }: any) => {
  const user: User = await findByUsername(params)
  
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
