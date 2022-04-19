import { createCookieSessionStorage, redirect } from '@remix-run/node'
import type { Session } from '@remix-run/node'
import { findUserById } from './user.server'
import axios from 'axios'

export async function register() {
  return true
}

// login
export async function login({ 
  email, password } : { 
  email: string, password: string
  }) {
  const response = await axios.post(`http://localhost:8000/api/users/login`, {
    email, password
  })
  return response.data
}

// get session secret
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) throw new Error('No Session Secret')

// create session storage
const storage = createCookieSessionStorage({
  cookie: {
    name: 'remix_twitter_clone',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 60,
    httpOnly: true
  }
})

// create session
export async function createUserSession(userid: string, redirectTo: string): Promise<Response> {
  const session = await storage.getSession()
  session.set('userid', userid)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

// get user session
export function getUserSession(request: Request): Promise<Session> {
  return storage.getSession(request.headers.get('Cookie'))
}

// get logged in user
// TODO: define type User
// * type will be Promise<User>
export async function getUser(request: Request): Promise<any> {
  const session = await getUserSession(request)
  const userid = session.get('userid')

  if (!userid || typeof userid !== 'string') return null

  try {
    const user = await findUserById(userid)
    return user
  } catch (error) {
    return null
  }
}

// log out user and destroy session
// TODO: find out why its redirection but not updating root.tsx
// might need to force a refresh because
// it destroys the session and redirects but
// the button still says to log out once "logged out" until a refresh
export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))

  return redirect('/logout', { 
    headers: { 
      'Set-Cookie': await storage.destroySession(session)
    }
  })
} 
