import { login, createUserSession } from "./models/session.server"
import type { ActionFunction } from "@remix-run/node"
import LoginForm from "./components/LoginForm"

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email') as string
  const password = form.get('password') as string
  const fields: {email: string, password: string } = { email, password }

  // logs in user
  const user = await login(fields)

  // create user session and redirects to the home page
  return createUserSession(user._id, '/home')
}

export default function LoginPage() {
  return (
    <div className='auth-container'>
      <div className='page-header'>
        <h1>Login Page</h1>
      </div>
      <div className='page-content'>
        <LoginForm />
      </div>
    </div>
  )
}
