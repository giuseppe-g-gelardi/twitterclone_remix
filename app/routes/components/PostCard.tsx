import { Link, useLoaderData } from "@remix-run/react"
import moment from 'moment'

import type { Post } from "../api/models/post.models"
import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export default function PostCard({ post }: { post: Post }) {
  const { loggedInUser }: { loggedInUser: User } = useLoaderData()
  const createdAt = post.createdAt as unknown as Date
  const timestamp = moment(createdAt).fromNow()

  const likeIcons = (
    <div className="flex">
      <button onClick={() => console.log('like button pressed')}>
        <div className="hover:bg-slate-400 rounded-full">
          {post.likes.length ? (
            Icons.heartFilled
          ) : (
            Icons.heartOutline
          )}
        </div>
      </button>
      <div>
        {post.likes.length ? post.likes.length : '0'}
      </div>
    </div>
  )

  const settingsIcon = (
    <button onClick={() => console.log('Settings button clicked')}>
      {Icons.dotsHorizontal}
    </button>
  )

  const shareIcon = (
    <button onClick={() => console.log('share icon clicked')}>
      <div className="hover:bg-slate-400 rounded-full">
        {Icons.shareOutline}
      </div>
    </button>
  )

  const chatIcons = (
    <div className="flex">
      <button onClick={() => console.log('chat button pressed', post)} >
        <div className="hover:bg-slate-400 rounded-full">
          {post.comments.length ? (
            Icons.chatFilled
          ) : (
            Icons.chatOutline
          )}
        </div>
      </button>
      <div>
        {post.comments.length ? post.comments.length : '0'}
      </div>
    </div>
  )

  return (
    // this had padding bottom ( pb-2.5 )
    <div className="flex items-start border-t-2 border-r-2 border-l-2 border-b-violet-200">
      <div>
        <img
          className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 mt-2 ml-2"
          src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/skyrim-patrick-bateman.jpg"
          alt=""
        />
        {/* src={logggedInUser.profilePicture} is what it needs to be */}
      </div>
      <div className="flex-1 p-2.5">
        <div className="">
          <div className="">
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
              <div className="hover:bg-slate-400 rounded-full h-5 w-5">
                {settingsIcon}
              </div>
            </h3>
          </div>
          <div className="text-base mb-1">
            <button>
              <Link to={`../posts/${post._id}`}>
                <p>{post.body}</p>
              </Link>
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-2 ">
          <div>
            {chatIcons}
          </div>
          <div>
            {likeIcons}
          </div>
          <div>
            {shareIcon}
          </div>
        </div>
      </div>
    </div>
  )
}
