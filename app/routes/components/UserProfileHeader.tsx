import { useLoaderData } from "@remix-run/react"
import type { User } from "../api/models/user.models"

export default function UserProfileHeader() {
  const { loggedInUser }: { loggedInUser: User } = useLoaderData()
  const createdAt = loggedInUser.createdAt as unknown as Date
  const joinedDate = new Date(createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="flex flex-col max-h-full">
      <div className="shrink-0 w-full min-h-full relative">
        <img
          className="inline object-cover w-36 h-36 mr-2 rounded-full border-2 ml-14"
          src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/skyrim-patrick-bateman.jpg"
          alt=""
        />
        <div className="flex flex-col relative px-16">
          <h1 className="font-bold text-lg flex">
            {loggedInUser.firstname ? loggedInUser.firstname : 'Firstname'}{' '}
            {loggedInUser.lastname ? loggedInUser.lastname : 'Lastname'}{' '}
            {!loggedInUser.isVerified && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor" >
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
              
              {loggedInUser.location ? loggedInUser.location : 'the interwebs'}{' '}
            </span>
            <span className="flex items-center text-base mx-1">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
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
                  'Followers') : ( 'Follower' )}
              </>
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
