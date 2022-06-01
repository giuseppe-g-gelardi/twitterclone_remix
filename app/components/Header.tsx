import type { User } from "../api/models/user.models";

import { Link } from "@remix-run/react";

type Props = {
  loggedInUser: User
}

export default function Header({ loggedInUser }: Props) {
  return (
    <div className="px-5 mb-2 h-10 z-20 flex sticky top-0 dark:bg-black bg-white">
        <h1 className="flex mt-1 font-bold text-xl place-content-center">
          Home
        </h1>
        <h2 className="font-bold text-lg ml-auto hover:bg-violet-500 hover:rounded-full p-1">
          <Link to={`/${loggedInUser.username}`}>
            View your profile
          </Link>
        </h2>
      </div>
  )
}
