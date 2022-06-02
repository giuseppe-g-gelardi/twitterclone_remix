import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"

import type { User } from "../api/models/user.models"
import { createUserSession, register } from "../api/session.server"

import RegisterForm from "../components/RegisterForm"

function validateUsername(username: string | any[]) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Invalid username. '
  }
}

function validateEmail(email: string | any[]) {
  if (typeof email !== 'string' || email.length < 3) {
    return 'Invalid Email'
  }
}

function validatePassword(password: string | any[]) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters'
  }
}

function confirmValidPassword(password: any, confirmPassword: any) {
  if (password !== confirmPassword) {
    return 'Passwords must match'
  }
}

function badRequest(data: { 
  fieldErrors: { 
    username: string | undefined; 
    email: string | undefined; 
    password: string | undefined, 
    confirmPassword: string | undefined }; 
  fields: { 
    username: string; email: string; 
    password: string, 
    confirmPassword: string 
  } }) {
  return json(data, { status: 400 })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username') as string
  const email = form.get('email') as string
  const password = form.get('password') as string
  const confirmPassword = form.get('confirmPassword') as string
  
  const fields: { 
    username: string, 
    email: string, 
    password: string, 
    confirmPassword: string
  } = {
    username, 
    email, 
    password, 
    confirmPassword
  }

  const fieldErrors = {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: confirmValidPassword(password, confirmPassword)
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
