// ? api routes for (non auth) user endpoints

// * express server users endpoint
// http://localhost:8000/api/users/

// ! all user auth (login, register) is located in session.server.ts
// TODO: convert all axios calls to fetch()

export async function findByUsername({ username }: { username: string | undefined}) {
  const response = await fetch(`http://localhost:8000/api/users/${username}`)
  const user = response.json()

  return user
}

export async function findPublicUsers() {
  const response = await fetch(`http://localhost:8000/api/users/search`)
  const publicUsers = response.json()

  return publicUsers
}

export async function findUserById(id: string) {
  const response = await fetch(`http://localhost:8000/api/users/id/${id}`)
  const user = response.json()
  
  return user
}


