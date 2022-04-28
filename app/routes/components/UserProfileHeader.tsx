import { useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export default function UserProfileHeader() {
  const { loggedInUser }: { loggedInUser: User } = useLoaderData()
  const createdAt = loggedInUser.createdAt as unknown as Date
  const joinedDate = new Date(createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    // TODO: add banner, use user profile picture
    <div className="flex flex-col max-h-full">
      <div className="shrink-0 w-full min-h-full relative">
        <div id='banner_test' className="flex w-full h-52 relative bg-gray-500">
          <img
            className="flex w-full h-auto overflow-hidden relative"
            src='https://upload.wikimedia.org/wikipedia/commons/4/4c/San_Francisco_with_two_bridges_and_the_low_fog.jpg'
            alt=''
          />
        </div>

        <div className="flex z-10 -mt-16">
          <img
            src={loggedInUser.profilePicture}
            alt=''
            className="z-10 inline object-cover w-36 h-36 mr-2 rounded-full border-2 ml-4"
          />
          <button
            className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-20 h-10 ml-auto mr-5 mt-20"
          >
            follow
          </button>
        </div>

        <div className="flex flex-col relative px-4">
          <h1 className="font-bold text-lg flex">
            {loggedInUser.firstname ? loggedInUser.firstname : 'Firstname'}{' '}
            {loggedInUser.lastname ? loggedInUser.lastname : 'Lastname'}{' '}
            {!loggedInUser.isVerified && (
              Icons.verified
            )}{' '}
          </h1>
          <h2 className="font-normal text-base text-gray-500">
            @{loggedInUser.username}
          </h2>
          <p className="font-normal mt-2.5">
            {loggedInUser.bio ? loggedInUser.bio : 'This is my bio lulz'}
          </p>
          <div className="my-2.5 flex">
            <span className="flex items-center text-base mx-1">
              <span>
                {Icons.location}
              </span>

              {loggedInUser.location ? loggedInUser.location : 'the interwebs'}{' '}
            </span>
            <span className="flex items-center text-base mx-1">
              <span>
                {Icons.calendar}
              </span>
              Joined {joinedDate}
            </span>
          </div>
          <div className="">
            <span className="">
              <strong>{loggedInUser.posts?.length}{' '}Posts,</strong>
              <strong>{' '}{loggedInUser.following?.length}{' '}Following,</strong>
              <strong>{' '}{loggedInUser.followers?.length}{' '}
                <>
                  {loggedInUser.followers?.length < 1
                    && loggedInUser.followers?.length > 1 ? (
                    'Followers') : ('Follower')}
                </>
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
