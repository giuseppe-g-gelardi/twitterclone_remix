import { Link } from "@remix-run/react"

import type { User } from "../api/models/user.models"

import Icons from "./Icons"

type UserCardProps = {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (

    <div className="flex items-start">
      <div className="p-5">
        <img src={user.profilePicture}
          alt=''
          className="inline object-cover w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex-1 p-2.5">
        <div className='post__header'>
          <div className="text-sm mb-1.5">
            <h3 className="text-base mb-1.5">
              <div className="flex no-wrap text-ellipsis overflow-hidden">
                <Link to={`/${user.username}`}>
                  {user.username}
                </Link>
                {user.isVerified && (
                  Icons.verified
                )}{' '}
              </div>
              <span
                className="flex font-semibold text-xs text-gray-500">
                @{user.username}
              </span>
            </h3>
          </div>
        </div>
      </div>
        <button
          
          className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-20 h-10 ml-auto my-auto mr-5"
        >
          follow
        </button>
      <div>
      </div>
    </div>
  )
}
