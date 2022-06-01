import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

import type { User } from "../api/models/user.models";

import Icons from "./Icons";

type LoaderData = {
  loggedInUser: User
}

export default function PostBox({ postValue }: { postValue: string }) {
  const { loggedInUser } = useLoaderData<LoaderData>()
  const transition = useTransition()
  const isAdding = transition.state === 'submitting' && transition.submission.formData.get('body')

  const formRef = useRef<any>()

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset()
    }
  }, [isAdding])

  return (
    <div className="">
      <Form ref={formRef} replace method="post">
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
            value={postValue}
            className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-20 h-10 ml-auto mr-2 mb-2"
          >
            {isAdding ? 'Posting...' : 'Post'}
          </button>
        </div>

      </Form>
    </div>
  )
}
