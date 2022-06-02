import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { 
  Form, 
  Link, 
  useActionData, 
  useSearchParams 
} from "@remix-run/react"

import type { User } from "../api/models/user.models"
import { 
  login, 
  createUserSession,
  validateEmail,
  validatePassword
} from "../api/session.server"

import Icons from "~/components/Icons"

type ActionData = {
  fieldErrors: {
    email?: string;
    password?: string;
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email') as string
  const password = form.get('password') as string
  const fields: { email: string, password: string } = { email, password }

  function badRequest(data: { 
    fieldErrors: { 
      email: string | undefined; 
      password: string | undefined 
    } | { 
      email: string 
    }; 
      fields: { 
        email: string; 
        password: string 
      } }) {
    return json(data, { status: 400 })
  }

  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  // logs in user
  const user: User = await login(fields)
  if (!user) return badRequest({
    fields,
    fieldErrors: { email: 'Invalid Credentials' }
  })

  // create user session and redirects to the home page
  return createUserSession(user._id, '/home')
}

export default function LoginPage() {
  const actionData = useActionData<ActionData>()
  const [searchParams] = useSearchParams()

  return (
    <div className="flex items-center space-y-4 py-auto font-semibold text-gray-500 flex-col">
      {Icons.terminalIconLG}
      <h1 className="text-slate-500 text-2xl">
        Sign in to continue
      </h1>
      <Form replace method='post' className="flex flex-col">
        <input
          className="w-full p-2 rounded-md border border-violet-300 focus:border-purple-700 bg-transparent"
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
          className="w-full p-2 rounded-md border border-violet-300 focus:border-purple-700 bg-transparent"
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
          type='submit' 
          value='login'
          name='_action'
        >
          Login
        </button>
      </Form>
      <div className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          className="text-blue-500 underline"
          to={{
            pathname: "/register",
            search: searchParams.toString(),
          }}
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
