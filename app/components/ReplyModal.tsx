import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";

import type { User } from '../api/models/user.models'
import Icons from "./Icons";

type LoaderData = {
  loggedInUser: User
}

type ModalProps = {
  buttonText: any
  header: string,
  feedid: string
}

export default function ReplyModal(props: ModalProps) {
  const { buttonText, header, feedid } = props
  const { loggedInUser } = useLoaderData<LoaderData>()
  const [showModal, setShowModal] = useState<boolean>(false);
  const transition = useTransition()
  const isAdding = transition.state === 'submitting' && transition.submission.formData.get('body')
  const formRef = useRef<any>()

  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'scroll'
  }, [showModal])

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset()
    }
  }, [isAdding])

  return (
    <>
      <button
        className=" hover:bg-slate-400 rounded-full"
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

              {/*body*/}
              <Form ref={formRef} replace method="put">
                <div className="flex px-5">
                  <img
                    className="inline object-cover w-12 h-12 rounded-full border-2"
                    src={loggedInUser.profilePicture}
                    alt=""
                  />
                  <input
                    type='text'
                    name="body"
                    className="flex text-gray-500 rounded-xl w-full mx-2 border-0 focus:outline-none bg-transparent"
                    placeholder="What's happening?"
                  />
                  <input
                    type='hidden'
                    name='commentid'
                    value={feedid}
                  />
                </div>
                <div className="flex ml-20">
                  <button className="mx-2" onClick={() => console.log('post image')}>
                    {Icons.insertImg}
                  </button>
                  <button className="mx-2" onClick={() => console.log('post gif')}>
                    {Icons.insertGif}
                  </button>
                  <button className="mx-2" onClick={() => console.log('insert emoji')}>
                    {Icons.insertEmoji}
                  </button>

                  <button
                    type='submit'
                    name='_action'
                    value='reply'
                    className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-20 h-10 ml-auto mr-2 mb-2"
                  >
                    {isAdding ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </Form>
              {/*body*/}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

