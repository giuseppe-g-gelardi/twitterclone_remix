import { useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export default function ProfileHeader() {
  const { user, loggedInUser }: { user: User, loggedInUser: User | null } = useLoaderData()
  const createdAt = user.createdAt as unknown as Date
  const joinedDate = new Date(createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    // TODO: add banner, use user profile picture
    <div className="flex flex-col max-h-full">
      <div className="shrink-0 w-full min-h-full relative">

        {/* figure out conditional rendering here and forced width ugh */}
        <div className="flex w-full h-52 relative bg-gray-500">
          {user.profileBanner ? (
            <img
              className="flex w-full h-auto overflow-hidden relative"
              src={user.profileBanner}
              alt=''
            />
          ) : (
            // <div
            //   className=" bg-indigo-500">
            //   {/* className="flex w-full h-52 relative bg-gray-500"> */}
            // </div>
            null
          )}
          {/* <img
            className="flex w-full h-auto overflow-hidden relative"
            src='https://upload.wikimedia.org/wikipedia/commons/4/4c/San_Francisco_with_two_bridges_and_the_low_fog.jpg'
            alt=''
          /> */}
        </div>

        <div className="flex z-10 -mt-16">
          <img
            src={user.profilePicture}
            alt=''
            className="z-10 inline object-cover w-36 h-36 mr-2 rounded-full border-2 ml-4"
          />

          <div
            className="ml-auto"
          >
            {loggedInUser?._id === user._id ? (
              <button
                className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-30 h-10 mr-5 mt-20 p-2"
                onClick={() => console.log('edit profile')}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-30 h-10 mr-5 mt-20 p-2"
                onClick={() => console.log('follow/unfollow user')}
              >
                Follow
              </button>
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
        <p className="font-normal mt-2.5">
          {user.bio ? user.bio : 'This is my bio lulz'}
        </p>

        <div className="my-2.5 flex">
          <span className="flex items-center text-base">
            <span className=''>
              {Icons.location}
            </span>
            {user.location ? user.location : 'the interwebs'}{' '}
          </span>

          <span className="flex items-center text-base">
            <span className="ml-2">
              {Icons.calendar}
            </span>
            Joined {joinedDate}
          </span>
        </div>

        <div className="">
          <span className="">
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
