import ReplyModal from "./ReplyModal";
import Icons from "./Icons";
import { Form, Link } from "@remix-run/react";
import moment from "moment";

export default function RepliesFeed({ replies, user, feedid }: any) {
  const createdAt = replies?.createdAt as unknown as Date
  const timestamp = moment(createdAt).fromNow()

  const likeIcons = (
    <div className="flex">
      <Form replace method='put'>
        <input
          type='hidden'
          value={replies?._id}
          name='replyLike'
        /> 
        <button
          type="submit"
          name='_action'
          value='replyLike'
        >
        <div className="hover:bg-slate-400 rounded-full">
          {replies?.likes?.length ? (
            Icons.heartFilled
          ) : (
            Icons.heartOutline
          )}
        </div>
        </button>
      </Form>
      <div>
        {replies?.likes?.length ? replies?.likes.length : '0'}
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
          {replies?.comments?.length ? (
            Icons.chatFilled
          ) : (
            Icons.chatOutline
          )}
        </div>
      {replies?.comments && (
        <div>
          {replies?.comments?.length ? replies?.comments?.length : '0'}
        </div>
      )}
      {replies?.replies && (
        <div>
          {replies?.replies?.length ? replies?.replies?.length : '0'}
        </div>
      )}
    </div>
  )

  const repostIcon = (
    <div className='flex'>
      <button onClick={() => console.log('repost icon pressed', replies)}>
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
                src={user?.profilePicture}
                alt=""
              />
            </div>
          </div>
          <div className="flex-1 p-2.5">
            <div className="">
              <div className="">
                <h3 className="flex text-base mb-1">
                  <p>
                    <Link to={`/${user?.username}`} className='hidden sm:inline'>
                      <span className='font-bold hover:underline'>
                        {user?.firstname}{' '}{user?.lastname}
                      </span>
                    </Link>
                    <Link to={`/${user?.username}`}>
                      <span className='text-gray-500 hover:underline ml-1'>
                        @{user?.username}{' '}
                      </span>
                    </Link>
                  </p>
                  {user?.isVerified ? (
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
                <p className='text-left'>{replies?.body}</p>
              </div>
            </div>
            <div className="flex justify-between mt-2 ">
              <div>
                <ReplyModal
                  buttonText={chatIcons}
                  header='Submit new Reply'
                  feedid={feedid}
                />
                <button
                  onClick={() => console.log(replies)}
                >
                  id logger lol
                </button>
              </div>
              <div>{repostIcon}</div>
              <div>{likeIcons}</div>
              <div>{shareIcon}</div>
            </div>
          </div>
        </div>
  )
}
