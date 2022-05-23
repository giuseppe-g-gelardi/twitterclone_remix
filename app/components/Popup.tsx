import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { User } from '../routes/api/models/user.models'


type LoaderData = {
  loggedInUser: User
}

type PopupProps = {
  buttonText: string,
  header: string,
}

export default function Popup(props: PopupProps) {
  const { buttonText, header } = props
  const { loggedInUser } = useLoaderData<LoaderData>()
  const [showModal, setShowModal] = useState<boolean>(true);
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
            {/*content*/}
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




              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}




              {/* profile banner */}
              {/* <div className="flex flex-col w-full h-52 relative bg-gray-500">
                <div className="flex flex-col">
                  <div className="z-10 bg-black inline object-cover absolute">
                    {/* upload banner image */}
                  {/* </div>
                </div>
              // </div> */}
              {/* profile banner */}

              {/* profile picture */}
              {/* <div className="flex z-10 -mt-16"></div> */}
              {/* profile picture */}

              {/*body*/}
              {/*body*/}


              {
                showSettings ? (
                  <>
                    <button
                      onClick={() => `${setShowProfileImageUpload(true)}${setShowSettings(false)}`}
                    >
                      show PFP
                    </button>

                    <button
                      onClick={() => `${setShowBannerImageUpload(true)}${setShowSettings(false)}`}
                    >
                      show PBI
                    </button>
                  </>
                ) : null}



              {
                showProfileImageUpload ? (
                  <>
                    <h1>upload profile image section</h1>

                    <button
                      onClick={() => `${setShowSettings(true)}${setShowProfileImageUpload(false)}`}
                    >
                      settings/back/idfk
                    </button>
                  </>
                ) : null}

              {
                showBannerImageUpload ? (
                  <>
                    <h1>upload profile banner image section</h1>


                    <button
                      onClick={() => `${setShowSettings(true)}${setShowBannerImageUpload(false)}`}
                    >
                      settings/back/idfk
                    </button>
                  </>
                ) : null}


              {/*body*/}
              {/*body*/}

              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-200 rounded-lg"
                  onClick={() => setShowModal(false)}
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
              {/*footer*/}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
