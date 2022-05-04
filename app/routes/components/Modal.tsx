import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import type { User } from '../api/models/user.models'

type LoaderData = {
  loggedInUser: User
}

export default function Modal({
  buttonText, header
}: {
  buttonText: string, header: string
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { loggedInUser } = useLoaderData<LoaderData>()

  return (
    <>
      <button
        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl"
        onClick={() => setShowModal(true)}
      >
        {buttonText}
      </button>
      {showModal ? (
        <Form replace method='put'>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
{/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-200 outline-none focus:outline-none">
{/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    {header}
                  </h3>
                  <button
                    className="p-1 ml-auto ` text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-red-500 text-3xl hover:bg-red-200 rounded-full">
                      ×
                    </span>
                  </button>
                </div>
{/* profile banner and pfp */}
                <div className="flex w-full h-52 relative bg-gray-500">
                  {loggedInUser.profileBanner ? (
                    <button
                      onClick={() => console.log('update profile banner')}
                      >
                      <img
                        className="flex w-full h-auto overflow-hidden relative"
                        src={loggedInUser.profileBanner}
                        alt=''
                      />
                    </button>
                  ) : (
                    <img
                      className="flex w-full h-auto overflow-hidden relative object-none object-right"
                      src="https://www.grunge.com/img/gallery/bizarre-things-weve-sent-to-outer-space/intro-1617974432.jpg"
                      alt=""
                    />
                  )}
                </div>
                <div className="flex z-10 -mt-16">
                  <button
                    onClick={() => console.log('update profile image')}
                    >
                    <img
                      src={loggedInUser.profilePicture}
                      alt=''
                      className="z-10 inline object-cover w-36 h-36 mr-2 rounded-full border-2 ml-4"
                      />
                  </button>
                </div>
{/* profile banner and pfp */}

{/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    <div id='form wrapper'>
                      <input
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder={loggedInUser?.firstname}
                        defaultValue={loggedInUser?.firstname}
                      />
                      <input
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder={loggedInUser?.lastname}
                        defaultValue={loggedInUser?.lastname}
                      />
                      <textarea
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        name='bio'
                        id='bio'
                        placeholder={loggedInUser?.bio}
                        defaultValue={loggedInUser?.bio}
                      />
                      <input
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        type='text'
                        name='location'
                        id='location'
                        placeholder={loggedInUser?.location}
                        defaultValue={loggedInUser?.location}
                      />
                    </div>
                  </p>
                </div>
{/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-violet-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    name='_action'
                    value='update'
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Form>
      ) : null}
    </>
  );
}
