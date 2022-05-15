import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"

import type { User } from "./api/models/user.models"
import { login, createUserSession } from "./api/session.server"

import LoginForm from "./components/LoginForm"

function validateEmail(email: any) {
  if (typeof email !== 'string' || email.length < 3) {
    return 'Invalid Email'
  }
}

function validatePassword(password: any) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters'
  }
}

function badRequest(data: any) {
  return json(data, { status: 400 })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email') as string
  const password = form.get('password') as string
  const fields: { email: string, password: string } = { email, password }

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

  return (
    <>
      <LoginForm />
    </>
  )
}
