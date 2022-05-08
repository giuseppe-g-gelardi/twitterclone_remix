import { Form, useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import type { MutableRefObject } from 'react'

import type { User } from "../api/models/user.models";
import UserCard from "./UserCard";

type LoaderData = {
  publicUsers: User[]
}

export default function SearchBar() {
  const { publicUsers } = useLoaderData<LoaderData>()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [dropdown, setDropdown] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="mt-5">
      <Form ref={formRef}>

        <input
          onFocus={() => setDropdown(true)}
          onBlur={() => formRef.current?.reset()}
          name='userSearch'
          placeholder='   Search for other users...'
          onChange={e => setSearchTerm(e.target.value)}
          className='flex text-gray-500 rounded-full h-12 w-full mt-2 mb-5 dark:bg-zinc-700 bg-slate-200 focus:outline-none focus:border-2 focus:border-violet-500'
        >
          
        </input>
      </Form>
      {dropdown ? (
        <div className="dark:bg-zinc-700 mb-5 rounded-3xl bg-slate-200">
          <ul>
            {publicUsers
              .filter(val => {
                let searchString = ''
                for (let [key, value] of Object.entries(val)
                  .filter(([key]) => key.includes('name'))) {
                  searchString += `${value}\t`
                }
                if (searchTerm === '') return null
                // return val to show 3 right away
                else if (searchString.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })
              .slice(0, 3)
              .map(user => (
                <UserCard key={user._id} user={user} setDropdown={setDropdown} />
              ))}
          </ul>
        </div>
      ) : null}

    </div>
  )
}
