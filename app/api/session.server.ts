import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { findUserById } from './user.server'
import type { Session } from '@remix-run/node'
import type { User } from './models/user.models'

// login existing user
export async function login({
  email, password
} : {
  email: string, password: string
}): Promise<User> {
  const response = await fetch(`http://localhost:8000/api/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.json()
}

// register new user
export async function register({ 
    username, email, password 
  } : {
    username: string, email: string, password: string
  }): Promise<User> {
  const response = await fetch(`http://localhost:8000/api/users/new`, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.json()
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
export async function getUser(request: Request): Promise<User | null> {
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

export async function logout(request: Request): Promise<Response> {
  const session = await storage.getSession(request.headers.get('Cookie'))

  return redirect('/logout', { 
    headers: { 
      'Set-Cookie': await storage.destroySession(session)
    }
  })
} 

export function validateUsername(username: string | any[]) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Invalid username. '
  }
}

export function validateEmail(email: string | any[]) {
  if (typeof email !== 'string' || email.length < 3) {
    return 'Invalid Email'
  }
}

export function validatePassword(password: string | any[]) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters'
  }
}

export function confirmValidPassword(password: any, confirmPassword: any) {
  if (password !== confirmPassword) {
    return 'Passwords must match'
  }
}

