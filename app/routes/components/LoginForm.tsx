import { Form, useActionData } from "@remix-run/react";

export default function LoginForm() {
  const actionData = useActionData()

  return (
    <div className="flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
      <h1 className="text-slate-500 text-2xl">
        Sign in to continue
      </h1>
      <Form replace method='post' className="flex flex-col">
        <input
          className="w-full p-2 rounded-md border border-gray-700 focus:border-blue-700"
          type='text'
          name='email'
          id='email'
          placeholder='Email'
        />
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
          className="w-full p-2 rounded-md border border-gray-700"
          type='password'
          name='password'
          placeholder='Password'
          id='password'
          // defaultValue={actionData?.fieldErrors?.password}
        />
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
      </Form>
    </div>
  )
}
