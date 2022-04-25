import { useLoaderData } from "@remix-run/react"
import moment from 'moment'

import type { Post } from "../api/models/post.models"
import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export default function PostCard({ post }: { post: Post }) {
  const { loggedInUser }: { loggedInUser: User } = useLoaderData()
  const createdAt = post.createdAt as unknown as Date
  const timestamp = moment(createdAt).fromNow()

  const likeIcons = (
    <button onClick={() => console.log('like button pressed')}>
      {post.likes.length ? (
        Icons.heartFilled
      ) : (
        Icons.heartOutline
      )}

      {post.likes.length ? post.likes.length : '0'}
    </button>
  )

  return (
    <div className="flex items-start border-b-violet-200 pb-2.5">
      <div>
        <img src={loggedInUser.profilePicture} alt='' />
      </div>

      <div className="flex-1 p-2.5">
        <div className="">
          <div className="text-base mb-1">
            <h3 className="flex text-base mb-1">
              <p>
                {loggedInUser.username}{' '}
              </p>
              <p>
                {Icons.verified}{' '}
              </p>
              <p className="grow">
                {timestamp}{' '}
              </p>
            </h3>
          </div>
          <div className="text-base mb-1">
            <p>{post.body}</p>
          </div>
        </div>
        <div>
          {/* display: 'flex',justifyContent: 'space-between',marginTop: '10px' */}
          {/* here is where the icons will go */}
        </div>

      </div>
      {likeIcons}

    </div>
  )
}
