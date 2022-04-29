import { useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"

import type { User } from "../api/models/user.models"
import UserCard from "./UserCard"

export default function SuggestedUsers() {
  const { publicUsers }: { publicUsers: User[]} = useLoaderData()
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
    setSuggested([...result])
  }

  useEffect(() => {
    getThreeRandomPublicUsers(publicUsers, 3)
    setInterval(getThreeRandomPublicUsers, 15000, publicUsers, 3)
}, [publicUsers])

  return (
    <div className="border-2 rounded-3xl bg-slate-200">
      <h1 className="p-2 font-bold text-lg flex">
        Who to follow
      </h1>
        <ul>
          {suggested?.map(user => 
          <UserCard key={user._id} user={user} />)}
        </ul>
    </div>
  )
}
