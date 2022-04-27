import { Link } from "@remix-run/react"
import Icons from "./Icons"

export default function UserCard({ user }: any) {
  return (

    <div className="flex items-start pb-2.5">
      <div className="p-5">
        <img src={user.profilePicture} 
          alt='' 
          className="inline object-cover w-5 h-5 rounded-full border-2" 
        />
      </div>
      <div className="flex-1 p-2.5">
        <div className='post__header'>
          <div className="text-sm mb-1.5">
            <h3 className="text-base mb-1.5">
              <Link to={`/${user.username}`}>{user.username}</Link>
              <span
                className="font-semibold text-xs text-gray-500">
                {user.isVerified && (
                  Icons.verified
                )}{' '}
                @{user.username}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
