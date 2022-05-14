import { NavLink, useLoaderData } from "@remix-run/react"
import type { ReactNode } from "react"

import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export const SidebarOption = ({ text }: { text: string }) => {
  return (
    <div className="flex text-xl items-center ">
      <h2>{text}</h2>
    </div>
  )
}

export const SidebarItem = ({
  children, link
}: {
  children: ReactNode,
  link: string
}) => {

  const baseNavItem = `flex text-gray-300 py-1 md:min-w-[250px] max-h-[58px] hover:bg-zinc-800 hover:rounded-full`

  const ActiveNavItem = ({ isActive }: { isActive: boolean }) => `${baseNavItem} 
  ${isActive ? 'text-white font-extrabold' : null}`

  return (
    <NavLink to={link} className={ActiveNavItem}>
      {children}
    </NavLink>
  )
}

export const ActiveSMItem = () => {
  return (
    <>
      <h1>test</h1>
    </>
  )
}


type RootLoaderData = { loggedInUser: User }

export default function Sidebar() {
  const { loggedInUser } = useLoaderData<RootLoaderData>()

  const menu = (

    <div>

      <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
        <span className="m-4">
          {Icons.terminalIcon}
        </span>
      </div>

      <SidebarItem link='/home'>
        <span className="m-4">
          {Icons.homeIcon}
        </span>
        <div className="my-auto hidden md:block ">
          <SidebarOption text='Home' />
        </div>
      </SidebarItem>

      <SidebarItem link='/search'>
        <span className="m-4">
          {Icons.searchIcon}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text='Search' />
        </div>
      </SidebarItem>

      <SidebarItem link='/notifications'>
        <div className="m-4">
          {loggedInUser.notifications.length ?
            <span className="text-rose-400">{Icons.bellFilled}</span> : <span>{Icons.bellIcon}</span>}
        </div>
        <div className="my-auto hidden md:block">
          <SidebarOption text='Notifications' />
        </div>
      </SidebarItem>

      <SidebarItem link='/messages'>
        <span className="m-4">
          {Icons.mailIcon}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text='Messages' />
        </div>
      </SidebarItem>

      <SidebarItem link='/feed'>
        <span className="m-4">
          {Icons.feedIcon}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text='Feed' />
        </div>
      </SidebarItem>

      <SidebarItem link='/fray'>
        <span className="m-4">
          {Icons.sparkles}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text='The Fray' />
        </div>
      </SidebarItem>

      <SidebarItem link='/network'>
        <span className="m-4">
          {Icons.frayIcon}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text='My Network' />
        </div>
      </SidebarItem>

      <SidebarItem link='/settings'>
        <span className="m-4">
          {Icons.fingerprint}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text='Settings' />
        </div>
      </SidebarItem>

      <SidebarItem link={`/${loggedInUser.username}`}>
        <span className="m-4">
          {Icons.userIcon}
        </span>
        <div className="my-auto hidden md:block">
          <SidebarOption text={loggedInUser.username} />
        </div>
      </SidebarItem>

      <form action="/logout" method="post">
        <div className="flex text-gray-300 py-1 md:min-w-[250px] max-h-[58px] hover:bg-zinc-800 hover:rounded-full">

          <button type='submit' className="m-4">
            <span>
              {Icons.logoutIcon}
            </span>
          </button>

          <button type="submit">
            <div className="my-auto hidden md:block">
              <SidebarOption text='Logout' />
            </div>
          </button>

        </div>
      </form>

    </div>
  )

  return (
    <div className="bg-transparent ">
      {menu}
    </div>
  )
}

