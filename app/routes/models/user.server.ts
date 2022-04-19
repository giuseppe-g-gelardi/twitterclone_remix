import axios from 'axios'

// * express server users endpoint
// http://localhost:8000/api/users/

// ! all user auth (login, register) is located in session.server.ts
// TODO: convert all axios calls to fetch()

export async function getUserByUsername({ username }: { username: string | undefined}) {
  return axios.get(`http://localhost:8000/api/users/${username}`)
}

export async function publicUserSearch() {
  return axios.get(`http://localhost:8000/api/users/search`)
}

export async function findUserById(id: string) {
  const response = await fetch(`http://localhost:8000/api/users/id/${id}`)
  const user = response.json()
  
  console.log(user)
  return user
}

// export async function getUserById(id: any) {
//   return axios.get(`http://localhost:8000/api/users/id/${id}`)
// }
