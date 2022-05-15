import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";

import Icons from "./Icons";

export default function RegisterForm() {
  const actionData = useActionData()
  const [searchParams] = useSearchParams()

  return (
    <div className="flex items-center space-y-4 py-auto font-semibold text-gray-500 flex-col">
      {Icons.terminalIconLG}

      <h1 className="text-slate-500 text-2xl">
        Register a new Account
      </h1>
      <Form replace method='post' className="flex flex-col">
        <input
          className="w-full p-2 rounded-md border border-violet-300 focus:border-purple-700 bg-transparent"
          type='text' name='username' placeholder='Username' id='username' />
        <div className="mb-5">
          {actionData?.fieldErrors?.username ? (
            <p
              className='text-red-700'
              role='alert'
              id='username-error'
            >
              {actionData?.fieldErrors?.username}
            </p>
          ) : (
            <div className="mb-5">

            </div>
          )}
        </div>
        <input
          className="w-full p-2 rounded-md border border-violet-300 focus:border-purple-700 bg-transparent"
          type='email' name='email' placeholder='Email' id='email' />
        <div className="mb-5">
          {actionData?.fieldErrors?.email ? (
            <p
              className='text-red-700'
              role='alert'
              id='username-error'
            >
              {actionData?.fieldErrors?.email}
            </p>
          ) : (
            <div className="mb-5">

            </div>
          )}
        </div>
        <input
          className="w-full p-2 rounded-md border border-violet-300 focus:border-purple-700 bg-transparent"
          type='password' name='password' placeholder='Password' />
        <div className="mb-5">
          {actionData?.fieldErrors?.password ? (
            <p
              className='text-red-700'
              role='alert'
              id='password-error'
            >
              {actionData?.fieldErrors?.password}
            </p>
          ) : (
            <div className="mb-5">

            </div>
          )}
        </div>
        <button
          className="w-full p-2 bg-violet-400 rounded-full font-bold text-gray-900 border border-gray-700 "
          type='submit' value='login'>
          Login
        </button>
        <div className="flex items-center justify-center">
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              className="text-blue-500 underline"
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  )
}
