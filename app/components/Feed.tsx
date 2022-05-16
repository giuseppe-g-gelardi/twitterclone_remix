import type { SetStateAction } from 'react'
import { useState, useEffect } from 'react'

import { Form, Link } from '@remix-run/react'

import moment from 'moment'

import type { Comment } from '../routes/api/models/comment.models'

import type { Post } from '../routes/api/models/post.models'
import type { Reply } from '../routes/api/models/reply.models'
import type { User } from '../routes/api/models/user.models'

import Icons from "./Icons"
import { getCommentReplies } from '../routes/api/replies.server'

type PropTypes = {
  feed: Post | Comment | Reply | any,
  user: User,
  inputName: string,
  buttonValue: string,
}

export default function Feed({ feed, user, inputName, buttonValue }: PropTypes) {
  const createdAt = feed.createdAt as unknown as Date
  const timestamp = moment(createdAt).fromNow()
  // const [replies, setReplies] = useState<Reply[]>([])
  // const [showReplies, setShowReplies] = useState<SetStateAction<boolean>>(false)

  // !
  // useEffect(() => {
  //   async function getReplies(commentid: string) {
  //     const response = await fetch(`http://localhost:8000/api/replies/${commentid}/replies`)
  //     const replies = response.json()
    
  //     return replies
  //   }
  //   getReplies(feed._id).then(res =>{
  //     if (res.replies.length > 0) { setReplies(res.replies) }
  //   })

  // }, [feed._id])

  // useEffect(() => {
  //   console.log(replies)
  // })
  // !

  // async function getReplyFeed(repliesArray: any) {
  //   // // console.log(repliesArray.item.replies)
  //   try {
  //     let replyFeed = []
  //     for (let replies of repliesArray) {
        
  //       const replyItem = await getReplies(replies.item._id)
  //       const replyUser = await findUserById(replies.item.user)
  //       replyFeed.push({ replyItem, replyUser })
  //     }
  //     return replyFeed
  //   } catch (error: any) {
  //     throw new Error(error)
  //   }
  // }
  // const replyData = await getReplyFeed(commentData)



  const likeIcons = (
    <div className="flex">
      <Form replace method='put'>
        <input
          type='hidden'
          value={feed._id}
          name={inputName}
        />
        <button
          type="submit"
          name='_action'
          value={buttonValue}
        >
          <div className="hover:bg-slate-400 rounded-full">
            {feed.likes?.length ? (
              Icons.heartFilled
            ) : (
              Icons.heartOutline
            )}
          </div>
        </button>
      </Form>
      <div>
        {feed.likes?.length ? feed.likes.length : '0'}
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
      {feed.comments && (
        <div>
          {feed?.comments?.length ? feed?.comments?.length : '0'}
        </div>
      )}
      {feed.replies && (
        <div>
          {feed?.replies?.length ? feed?.replies?.length : '0'}
        </div>
      )}
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
    <div className="flex items-start border-t-2 border-b-violet-200">
      <div className='flex flex-col'>
        <div>
          <img
            className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 mt-2 ml-2"
            src={user.profilePicture}
            alt=""
          />
        </div>
        {feed.replies?.length > 0 && (
          <div className='w-auto h-auto m-auto mt-2.5 place-items-center'>
            <button 
              className='hover:bg-slate-500 rounded-full'
              onClick={() => console.log(feed.replies)}
            >
              
              {Icons.chevronDown}
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 p-2.5">
        <div className="">
          <div className="">
            <h3 className="flex text-base mb-1">
              <p>
                <Link to={`/${user.username}`} className='hidden sm:inline'>
                  <span className='font-bold hover:underline'>
                    {user.firstname}{' '}{user.lastname}
                  </span>
                </Link>
                <Link to={`/${user.username}`}>
                  <span className='text-gray-500 hover:underline ml-1'>
                    @{user.username}{' '}
                  </span>
                </Link>
              </p>
              {user.isVerified ? (
                <p className='ml-1'>
                  {Icons.verified}
                </p>
              ) : (
                null
              )}
              <p className="grow ml-1">
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
                <p className='text-left'>{feed.body}</p>
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

