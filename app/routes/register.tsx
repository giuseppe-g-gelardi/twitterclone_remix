import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"

import type { User } from "../api/models/user.models"
import { createUserSession, register } from "../api/session.server"

import RegisterForm from "../components/RegisterForm"

function validateUsername(username: any) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Invalid username. '
  }
}

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
  const username = form.get('username') as string
  const email = form.get('email') as string
  const password = form.get('password') as string
  
  const fields: { 
    username: string, email: string, password: string 
  } = {
    username, email, password,
  }

  const fieldErrors = {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password)
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  const newUser: User = await register(fields)
  return createUserSession(newUser._id, '/home')
}

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
