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

  // TODO: fix replies/comment
  // when comments = 0 this will display a chatOutline
  // when comments > 0 this will display chatFilled
  // onClick will take you to the posts individual page
  //
  // const chatIcons = (
  //   <button onClick={() => console.log('chat button pressed')} >
  //     {post.comments.length ? (
  //       <>
  //       {Icons.chatFilled}
  //       {post.comments.length}
  //       </>
  //     ) : (
  //       <>
  //         {Icons.chatOutline}
  //         {'0'}
  //       </>
  //     )}
  //   </button>
  // )

  return (
    <div className="flex items-start border-t-2 border-r-2 border-l-2 border-b-violet-200 pb-2.5">
      <div>
        <img
          className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 mt-2 ml-2"
          src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/skyrim-patrick-bateman.jpg"
          alt=""
        />
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
        <div className="flex justify-between mt-2">
          {/* display: 'flex',justifyContent: 'space-between',marginTop: '10px' */}
          {/* here is where the icons will go */}
          {Icons.chatOutline}
          {likeIcons}
          {Icons.shareOutline}
        </div>

      </div>

    </div>
  )
}
