import type { Key } from 'react'
import { useState } from 'react'

import { Form, Link } from '@remix-run/react'

import moment from 'moment'

import type { Comment } from '../api/models/comment.models'
import type { Post } from '../api/models/post.models'
import type { Reply } from '../api/models/reply.models'
import type { User } from '../api/models/user.models'

import Icons from "./Icons"
import RepliesFeed from './RepliesFeed'
import ReplyModal from './ReplyModal'

type PropTypes = {
  feed: Post | Comment | Reply | any,
  user: User,
  inputName: string,
  buttonValue: string,
  replies: any,
}

export default function Feed({ feed, user, inputName, buttonValue, replies }: PropTypes) {
  const createdAt = feed?.createdAt as unknown as Date
  const timestamp = moment(createdAt).fromNow()
  const [showReplies, setShowReplies] = useState(false)

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
        <div className="hover:bg-slate-400 rounded-full">
          {feed?.comments?.length || feed?.replies?.length ? (
            Icons.chatFilled
          ) : (
            Icons.chatOutline
          )}
        </div>
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
              onClick={() => console.log('replies lol')}
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
            {feed.replies && (
              <ReplyModal
                buttonText={chatIcons}
                header='Submit new Reply'
                feedid={feed._id}
              />
            )}
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
        <div>
          <>
            {feed?.replies?.length > 0 ? (
              <>
                {!showReplies && (
                  <button onClick={async () => `${setShowReplies(true)}`}>
                    <p className='text-violet-700 dark:text-violet-300 '>
                      show {feed.replies.length} replies
                    </p>
                  </button>
                )}
                {showReplies && (
                  <>
                    <button onClick={() => setShowReplies(false)}>
                      <p className='text-rose-700 dark:text-rose-300'>
                        hide {feed.replies.length} replies
                      </p>
                    </button>
                    <div>

                      {replies
                        .sort((a: any, b: any) => new Date(b?.reply?.createdAt).valueOf() - new Date(a?.reply?.createdAt).valueOf())
                        .map((reply: { _id: Key | null | undefined; reply: any; other: User }) => (
                          <RepliesFeed
                            key={Math.random().toString(16).slice(2)}
                            replies={reply.reply}
                            user={reply.other}
                            feedid={feed._id}
                          />
                        ))}
                    </div>
                  </>

                )}
              </>
            ) : (
              null
            )}
          </>
        </div>
      </div>
    </div>
  )
}



