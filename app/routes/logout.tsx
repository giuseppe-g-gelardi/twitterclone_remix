import type  { ActionFunction, LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { useMatches } from "@remix-run/react"
import { useEffect } from "react"

import { logout } from '~/routes/api/session.server'

export const action: ActionFunction = async ({ request }) => {
  return logout(request)
}

export const loader: LoaderFunction = async ({ request }) => {
  
  // return redirect('/')
  console.log(request)
  return 'something'
}

export default function Logout() {
  const matches = useMatches()

  useEffect(() => {
    console.log(matches)
  })

  return (
    <>
      fml    
    </>
  )





}

