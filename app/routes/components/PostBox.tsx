import { Form, useLoaderData, useTransition } from "@remix-run/react";
import Icons from "./Icons";

export default function PostBox() {
  const { loggedInUser } = useLoaderData()
  const transition = useTransition()
  const isAdding = transition.state === 'submitting' && transition.submission.formData.get('body')

  return (
    <div className="border-x-2">
      <Form replace method="post">
        <div className="flex px-5">
          <img
            className="inline object-cover w-12 h-12 rounded-full border-2"
            src={loggedInUser.profilePicture}
            alt=""
          />
          <input
            type='text'
            name="body"
            className="flex text-gray-500 rounded-xl w-full mx-2 border-0 focus:outline-none"
            placeholder="  What's happening?"
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
            value='post'
            className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-20 h-10 ml-auto mr-2 mb-2"
          >
            {isAdding ? 'Posting...' : 'Post'}
          </button>
        </div>

      </Form>
    </div>
  )
}
