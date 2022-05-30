import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { User } from '../api/models/user.models'
import Icons from "./Icons";
import UploadProfileBanner from "./UploadProfileBanner";
import UploadProfileImage from "./UploadProfileImage";

type LoaderData = {
  loggedInUser: User
}

type ModalProps = {
  buttonText: string,
  header: string,
}

export default function Modal(props: ModalProps) {
  const { buttonText, header } = props
  const { loggedInUser } = useLoaderData<LoaderData>()
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true)
  const [showProfileImageUpload, setShowProfileImageUpload] = useState<boolean>(false)
  const [showBannerImageUpload, setShowBannerImageUpload] = useState<boolean>(false)

  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'scroll'
  }, [showModal])

  return (
    <>
      <button
        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl"
        onClick={() => setShowModal(true)}
      >
        {buttonText}
      </button>
      {showModal ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-200 outline-none focus:outline-none  bg-opacity-30 backdrop-blur-lg">


              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold text-black">
                  {header}
                </h3>
                <button
                  className="ml-auto -mt-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className=" text-red-500 text-3xl hover:text-red-900">
                    ×
                  </span>
                </button>
              </div>
              {/*header*/}




              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}




              {/* profile banner */}
              <div className="flex flex-col w-full h-52 relative bg-gray-500">
                <div className="flex flex-col">
                  {loggedInUser.profileBanner ? (
                    <img
                      className="flex w-full h-auto overflow-hidden relative "
                      src={loggedInUser.profileBanner}
                      alt=''
                    />
                  ) : (
                    <img
                      className="flex w-full h-auto overflow-hidden relative object-none object-right"
                      src="https://www.grunge.com/img/gallery/bizarre-things-weve-sent-to-outer-space/intro-1617974432.jpg"
                      alt=""
                    />
                  )}
                </div>
              </div>
              {/* profile banner */}


              {/*  */}
              {/*  */}

              {/* profile picture */}
              <div className="flex z-10 -mt-16">
                  <img
                    src={loggedInUser.profilePicture}
                    alt=''
                    className="z-10 inline object-cover w-36 h-36 mr-2 rounded-full border-2 ml-4"
                  />
              </div>
              {/* profile picture */}

              {/*  */}
              {/*  */}


              {/*body*/}
              <Form replace method='put'>
                {showSettings ? (
                  <div className="relative p-6 flex-auto w-[768px] h-[315px]">
                    {/* buttons */}
                    <div className="float-right mb-5 -mt-5">
                      <button
                        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl px-5 mx-2"
                        onClick={() => `${setShowProfileImageUpload(true)}${setShowSettings(false)}`}
                      >
                        <div className="flex">
                          <p className="mr-5 flex">
                            {Icons.cameraIcon}
                          </p>
                          <p className="flex">
                            Update Profile Picture
                          </p>
                        </div>
                      </button>

                      <button
                        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl px-5 mx-2"
                        onClick={() => `${setShowBannerImageUpload(true)}${setShowSettings(false)}`}
                      >
                        <div className="flex">
                          <p className="mr-5 flex">

                            {Icons.photoIcon}
                          </p>
                          <p className="flex">
                            Update Banner
                          </p>

                        </div>
                      </button>
                    </div>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">

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
                    </p>
                    {/*footer*/}
                  </div>) : null}





                {showProfileImageUpload ? (
                  <div className="relative p-6 flex-auto w-[768px] h-[315px]">
                    <div className="float-right mb-5 -mt-5">
                      <button
                        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl px-5 mx-2"
                        onClick={() => `${setShowSettings(true)}${setShowProfileImageUpload(false)}`}
                      >
                        <div className="flex">
                          <p className="mr-5 flex">
                            {Icons.backButton}
                          </p>
                          <p className="flex">
                            settings
                          </p>
                        </div>
                      </button>
                    </div>
                    <>
                      <UploadProfileImage />
                    </>
                  </div>
                ) : null}





                {showBannerImageUpload ? (
                  <div className="relative p-6 flex-auto w-[768px] h-[315px]">
                    <div className="float-right mb-5 -mt-5">
                      <button
                        className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl px-5 mx-2"
                        onClick={() => `${setShowSettings(true)}${setShowBannerImageUpload(false)}`}
                      >
                        <div className="flex">
                          <p className="mr-5 flex">
                            {Icons.backButton}
                          </p>
                          <p className="flex">
                            settings
                          </p>
                        </div>
                      </button>
                    </div>
                    <>
                      <UploadProfileBanner />
                    </>

                  </div>
                ) : null}





                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-200 rounded-lg"
                    onClick={() => `${setShowModal(false)}${setShowSettings(true)}${setShowBannerImageUpload(false)}${setShowProfileImageUpload(false)}}`}
                    type='button'
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

              </Form>

            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}



          //         {/* {user.profileBanner ? (
          //   <img
          //     className="flex w-full h-auto overflow-hidden relative"
          //     src={user.profileBanner}
          //     alt=''
          //   />
          // ) : (
          //   <img
          //     className="flex w-full h-auto overflow-hidden relative object-none object-right"
          //     src="https://www.grunge.com/img/gallery/bizarre-things-weve-sent-to-outer-space/intro-1617974432.jpg"
          //     alt=""
          //   />
          // )} */}
