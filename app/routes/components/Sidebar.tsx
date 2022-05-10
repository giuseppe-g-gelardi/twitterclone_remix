import { Form, NavLink, useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export const SidebarOption = ({ _active, text }: any) => {
  return (
    <div className="flex text-xl items-center hover:text-violet-600 hover:ease-out active:text-violet-400">
      <h2>{text}</h2>
    </div>
  )
}

type LoaderData = {
  loggedInUser: User
}

export default function Sidebar() {
  const { loggedInUser } = useLoaderData<LoaderData>()

  const menu = (

    <div>

      <NavLink to='/home'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <span className="m-4">
            {Icons.terminalIcon}
          </span>
          <div className="my-auto hidden md:block ">
            {/* <SidebarOption active text='Home' /> */}
          </div>
        </div>
      </NavLink>


      <NavLink to='/home'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <span className="m-4">
            {Icons.homeIcon}
          </span>
          <div className="my-auto hidden md:block ">
            <SidebarOption active text='Home' />
          </div>
        </div>
      </NavLink>

      <NavLink to='/search'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <span className="m-4">
            {Icons.searchIcon}
          </span>
          <div className="my-auto hidden md:block">
            <SidebarOption text='Search' />
          </div>
        </div>
      </NavLink>

      <NavLink to='/notifications'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <div className="m-4">
            {loggedInUser.notifications.length ?
            <span className="text-rose-400">{Icons.bellFilled}</span> : <span>{Icons.bellIcon}</span>}
          </div>
          <div className="my-auto hidden md:block">
            <SidebarOption text='Notifications' />
          </div>

        </div>
      </NavLink>

      <NavLink to='/messages'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <span className="m-4">
            {Icons.mailIcon}
          </span>
          <div className="my-auto hidden md:block">
          <SidebarOption text='Messages' />
          </div>
        </div>
      </NavLink>

      <NavLink to='/feed'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <span className="m-4">
            {Icons.feedIcon}
          </span>
          <div className="my-auto hidden md:block">

          <SidebarOption text='Feed' />
          </div>
        </div>
      </NavLink>

      <NavLink to='/fray'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px]">
          <span className="m-4">
            {Icons.sparkles}
          </span>
          <div className="my-auto hidden md:block">

          <SidebarOption text='The Fray' />
          </div>
        </div>
      </NavLink>

      <NavLink to='/following'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px] ">
          <span className="m-4">
            {Icons.frayIcon}
          </span>
          <div className="my-auto hidden md:block">

          <SidebarOption text='Following' />
          </div>
        </div>
      </NavLink>

      <NavLink to='/settings'>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px] ">
          <span className="m-4">
            {Icons.fingerprint}
          </span>
          <div className="my-auto hidden md:block">
            
          <SidebarOption text='Settings' />
          </div>
        </div>
      </NavLink>

      <NavLink to={`/${loggedInUser.username}`}>
        <div className="flex py-1 md:min-w-[250px] max-h-[58px] ">
          <span className="m-4">
            {Icons.userIcon}
          </span>
          <div className="my-auto hidden md:block">

          <SidebarOption text='Profile' />
          </div>
        </div>
      </NavLink>

      <Form action="/logout" method="post">
        <div className="flex py-1 md:min-w-[250px] max-h-[58px] ">
          <span className="m-4">
            {Icons.logoutIcon}
          </span>
          <button type="submit">
            <div className="my-auto hidden md:block">

            <SidebarOption text='Logout' />
            </div>
          </button>
        </div>
      </Form>

    </div>

  )


  


  return (
    <div className="flex bg-transparent">
      {menu}
    </div>
  )
}

