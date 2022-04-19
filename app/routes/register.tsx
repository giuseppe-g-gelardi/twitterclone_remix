import RegisterForm from "./components/RegisterForm"
import { createUserSession, register } from "./api/session.server"
import type { ActionFunction } from "@remix-run/node"
import type { User } from "./api/models/user.models"

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
