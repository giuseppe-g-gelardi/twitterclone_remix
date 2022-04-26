import { Form } from "@remix-run/react";

export default function PostBox() {
  return (
    <div className="border rounded-full">
      <Form replace method="post">
        <div className="flex p-5">
          {/* <img src={user.profilePicture} /> */}
          <img
          className="inline object-cover w-10 h-10 rounded-full border-2"
          src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/skyrim-patrick-bateman.jpg"
          alt=""
          />
          <input
            type='text'
            name="body"
            className="flex text-gray-500 rounded-xl w-full mx-2"
            placeholder="  What's happening?"
          />
          <button
            type='submit'
            value='post'
            className="bg-violet-500 border-0 text-white font-extrabold rounded-3xl w-20 h-10 ml-auto"
          >
            Post
          </button>
        </div>

      </Form>
    </div>
  )
}
