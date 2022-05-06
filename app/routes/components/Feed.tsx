import type { ActionFunction } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import moment from 'moment'
import type { Post } from '../api/models/post.models'
import type { User } from '../api/models/user.models'
import { likeUnlikePost } from '../api/posts.server'
import { getUser } from '../api/session.server'

import Icons from "./Icons"

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData()
//   const user: User | null = await getUser(request)
//   const data = { user }
//   const loggedInUser = data.user

//   const postid = form.get('like') as string
//   // const { _action, ...values } = Object.fromEntries(form)

//   // console.log(await likeUnlikePost(user?._id, postid))

//   // if (_action === 'like') return likeUnlikePost(user?._id, postid)

//   const like = await likeUnlikePost(loggedInUser?._id, postid)

//   return like
// }

type PropTypes = {
  feed: Post,
  user: User
}

export default function Feed({ feed, user }: PropTypes) {
  const createdAt = feed.createdAt as unknown as Date
  const timestamp = moment(createdAt).fromNow()

  const likeIcons = (
    <div className="flex">
      <Form replace method='put'>
        <input
          type='hidden'
          value={feed._id}
          name='like'
        />
        <button
          type="submit"
          name='_action'
          value='like'
        >
          <div className="hover:bg-slate-400 rounded-full">
            {feed.likes.length ? (
              Icons.heartFilled
            ) : (
              Icons.heartOutline
            )}
          </div>
        </button>
      </Form>
      <div>
        {feed.likes.length ? feed.likes.length : '0'}
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
      <button onClick={() => console.log('chat button pressed', feed)} >
        <div className="hover:bg-slate-400 rounded-full">
          {feed?.comments?.length ? (
            Icons.chatFilled
          ) : (
            Icons.chatOutline
          )}
        </div>
      </button>
      <div>
        {feed?.comments?.length ? feed?.comments?.length : '0'}
      </div>
    </div>
  )

  const repostIcon = (
    <div className='flex'>
      <button onClick={() => console.log('repost icon pressed', feed)}>
        <div className='hover:bg-slate-400 rounded-full'>
          {Icons.repost}
        </div>
      </button>
      <div>
        0
      </div>
    </div>
  )




  return (
    <div className="flex items-start border-t-2 border-r-2 border-l-2 border-b-violet-200">
      <div>
        <img
          className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 mt-2 ml-2"
          src={user.profilePicture}
          alt=""
        />
      </div>
      <div className="flex-1 p-2.5">
        <div className="">
          <div className="">
            <h3 className="flex text-base mb-1">
              <p>
                <Link to={`/${user.username}`}>
                  {user.username}{' '}
                </Link>
              </p>
              {user.isVerified ? (
                <p>
                  {Icons.verified}
                </p>
              ) : (
                null
              )}
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
              <Link to={`../posts/${feed._id}`}>
                <p>{feed.body}</p>
              </Link>
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-2 ">
          <div>
            {chatIcons}
          </div>
          <div>
            {repostIcon}
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

