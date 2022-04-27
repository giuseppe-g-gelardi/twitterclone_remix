import type { User } from "./models/user.models"

// ? api routes for (non auth) user endpoints

// * express server users endpoint
// http://localhost:8000/api/users/

// ! all user auth (login, register) is located in session.server.ts

export async function findByUsername({ username }: { username: string | undefined}): Promise<User> {
  const response = await fetch(`http://localhost:8000/api/users/${username}`)
  const user = response.json()

  return user
}

export async function findPublicUsers(): Promise<User[]> {
  const response = await fetch(`http://localhost:8000/api/users/search`)
  const publicUsers = response.json()

  return publicUsers
}

export async function findUserById(id: string): Promise<User> {
  const response = await fetch(`http://localhost:8000/api/users/id/${id}`)
  const user = response.json()
  
  return user
}

export async function uploadProfileImage(username: any, image: any) {
  const response = await fetch(`http://localhost:8000/api/users/${username}/update`, {
    method: 'PUT',
    body: JSON.stringify({ image }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const profilePicture = await response.json()

  return profilePicture
}



