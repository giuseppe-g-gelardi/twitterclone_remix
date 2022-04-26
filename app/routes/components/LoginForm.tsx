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
          // defaultValue={actionData?.fieldErrors?.email}
        
          //
        />
        <div>
          {actionData?.fieldErrors?.email ? (
            <p
              className='text-red-700'
              role='alert'
              id='username-error'
            >
              {actionData?.fieldErrors?.email}
            </p>
          ) : null}

        </div>
        <input
          className="w-full p-2 rounded-md border border-gray-700"
          type='password'
          name='password'
          placeholder='Password'
          id='password'
          // defaultValue={actionData?.fieldErrors?.password}
        />
        <div>
          {actionData?.fieldErrors?.password ? (
            <p
              className='text-red-700'
              role='alert'
              id='password-error'
            >
              {actionData?.fieldErrors?.password}
            </p>
          ) : null}
        </div>
        <button 
          className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
          type='submit' value='login' style={{ backgroundColor: 'lightBlue' }}>
          Login
        </button>
      </Form>
    </div>
  )
}
