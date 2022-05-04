import type { ActionFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import type { User } from '../api/models/user.models'
import { getUser } from "../api/session.server";
import { updateBio, updateFirstname, updateLastname, updateLocation } from "../api/user.server";

type LoaderData = {
  loggedInUser: User
}

// TODO: connect the form

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const firstname = form.get('firstname') as string
  const lastname = form.get('lastname') as string
  const bio = form.get('bio') as string
  const location = form.get('location') as string

  const updateFirst = await updateFirstname(loggedInUser?.username, firstname)
  const updateLast = await updateLastname(loggedInUser?.username, lastname)
  const update_bio = await updateBio(loggedInUser?.username, bio)
  const update_location = await updateLocation(loggedInUser?.username, location)

  return { updateFirst, updateLast, update_bio, update_location }
}

export default function Modal({ 
  buttonText, header }: { buttonText: string, header: string 
  }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { loggedInUser } = useLoaderData<LoaderData>()
  return (
    <>
      <button
        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl"
        // type="button"
        onClick={() => setShowModal(true)}
      >
        {buttonText}
      </button>
      {showModal ? (
        <>
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
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-red-500 text-3xl hover:bg-red-200 rounded-full">
                      ×
                    </span>
                  </button>

                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">

                  <p className="my-4 text-slate-500 text-lg leading-relaxed">

                    <Form replace method='put'>
                      {/* add profile image && banner */}
                      <input
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder={loggedInUser?.firstname}
                      />

                      <input
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder={loggedInUser?.lastname}
                      />

                      <textarea
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        name='bio'
                        id='bio'
                        placeholder={loggedInUser?.bio}
                      />

                      <input
                        className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
                        type='text'
                        name='location'
                        id='location'
                        placeholder={loggedInUser?.location}
                      />

                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-violet-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          onClick={() => setShowModal(false)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </Form>

                  </p>
                </div>
                {/*footer*/}

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
