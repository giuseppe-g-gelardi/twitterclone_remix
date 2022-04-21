import { findPublicUsers } from "../api/user.server"
import type { LoaderFunction } from "@remix-run/node"
import type{ User } from "../api/models/user.models"
import { Link, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"

export const loader: LoaderFunction = async () => {
  const publicUsers: User[] = await findPublicUsers()

  return { publicUsers }
}

export default function SuggestedUsers() {
  const { publicUsers } = useLoaderData()
  const [ suggested, setSuggested ] = useState<User[]>([])

  const getThreeRandomPublicUsers = async (arr: User[], n: number):Promise<void> => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len)
    
    if (n > len) throw new RangeError('more elements taken than available')

    while (n--) {
      let x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    console.log(result)
    setSuggested([...result])
  }

  useEffect(() => {
      setTimeout(() => getThreeRandomPublicUsers(publicUsers, 3), 15000)
  }, [publicUsers, suggested])

  return (
    <div>
      <>
        <p>
          <button
            onClick={() => getThreeRandomPublicUsers(publicUsers, 3)}
            >
            SU logger
          </button>
        </p>
      </>
      <div>
        <p>############</p>
        <p>Suggested Users</p>
        <p>############</p>
        <ul>
          {suggested?.map(user => 
          <li key={user._id}>
                <Link to={`/${user.username}`}>
                  {user.username}
                </Link>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

