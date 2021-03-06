import { Form, useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import Icons from "./Icons"
import Modal from "./Modal"

type LoaderData = {
  user: User,
  loggedInUser: User | null
}

export default function ProfileHeader() {
  const { user, loggedInUser } = useLoaderData<LoaderData>()
  const createdAt = user.createdAt as unknown as Date
  const joinedDate = new Date(createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })

  const username = loggedInUser?.username as string as never
  const followers = user.followers
  const isFollowing = followers.includes(username)

  return (
    <div className="flex flex-col max-h-full">
      <div className="shrink-0 w-full min-h-full relative">
        <div className="flex w-full h-52 relative bg-gray-500">
          {user.profileBanner ? (
            <img
              src={user.profileBanner}
              alt=''
              className="flex w-full h-auto overflow-hidden relative"
            />
          ) : (
            <img
              className="flex w-full h-auto overflow-hidden relative object-none object-right"
              src="https://www.grunge.com/img/gallery/bizarre-things-weve-sent-to-outer-space/intro-1617974432.jpg"
              alt=""
            />
          )}
        </div>

        <div className="flex z-10 -mt-16">
          <img
            src={user.profilePicture}
            alt=''
            className="z-10 inline object-cover w-36 h-36 mr-2 rounded-full border-2 ml-4"
          />
          <div className="ml-auto">
            {loggedInUser?._id === user._id ? (
              <div
                className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-30 h-10 mr-5 mt-20 p-2"
              >
                <Modal
                  buttonText='Edit Profile'
                  header='Edit Profile'
                />
              </div>
            ) : (
              <Form replace method='put' encType="multipart/form-data">
                <input
                  type='hidden'
                  value={loggedInUser?.username}
                  name='follow'
                />
                {isFollowing ? (
                  <button
                    type='submit'
                    name='_action'
                    value='follow'
                    className="bg-transparent border-2 hover:border-rose-500 hover:text-rose-500 text-white font-extrabold rounded-3xl w-30 h-10 mr-5 mt-20 p-2"
                  >
                    following
                  </button>
                ) : (
                  <button
                    type='submit'
                    name='_action'
                    value='follow'
                    className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-30 h-10 mr-5 mt-20 p-2"
                  >
                    follow
                  </button>
                )}
              </Form>
            )}
          </div>
        </div>

      </div>
      <div className="flex flex-col relative px-4">
        <h1 className="font-bold text-lg flex">
          {user.firstname ? user.firstname : 'Firstname'}{' '}
          {user.lastname ? user.lastname : 'Lastname'}{' '}
          {user.isVerified && (
            <p className="px-1">
              {Icons.verified}{' '}
            </p>
          )}{' '}
        </h1>
        <h2 className="font-normal text-base text-gray-500">
          @{user.username}
        </h2>
        <p className="font-normal mt-2.5 ">
          {user.bio ? user.bio : 'This is my bio lulz'}
        </p>

        <div className="my-2.5 flex">
          <span className="flex items-center text-base text-gray-500">
            <span className=''>
              {Icons.location}
            </span>
            {user.location ? user.location : 'the interwebs'}{' '}
          </span>

          <span className="flex items-center text-base text-gray-500">
            <span className="ml-2">
              {Icons.calendar}
            </span>
            Joined {joinedDate}
          </span>
        </div>

        <div className="">
          <span className="text-gray-500">
            <strong>{user.posts?.length}{' '}Posts,</strong>
            <strong>{' '}{user.following?.length}{' '}Following,</strong>
            <strong>{' '}{user.followers?.length}{' '}
              <>
                {user.followers?.length < 1
                  && user.followers?.length > 1 ? (
                  'Followers') : ('Follower')}
              </>
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}


