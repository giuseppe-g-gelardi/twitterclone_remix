import { Form, NavLink, useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import Icons from "./Icons"

export const SidebarOption = ({ _active, text }: any) => {
  return (
    <div className="flex font-bold p-2 text-2xl items-center hover:text-violet-600 hover:ease-out active:text-violet-400">
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
        <div className="flex">
          <span className="m-2">
            {Icons.homeIcon}
          </span>
          <SidebarOption active text='Home' />
        </div>
      </NavLink>

      <NavLink to='/search'>
        <div className="flex">
          <span className="m-2">
            {Icons.searchIcon}
          </span>
          <SidebarOption text='Search' />
        </div>
      </NavLink>

      <NavLink to='/notifications'>
        <div className="flex">
          <span className="m-2">
            {Icons.bellIcon}
          </span>
          <SidebarOption text='Notifications' />
        </div>
      </NavLink>

      <NavLink to='/messages'>
        <div className="flex">
          <span className="m-2">
            {Icons.mailIcon}
          </span>
          <SidebarOption text='Messages' />
        </div>
      </NavLink>

      <NavLink to='/feed'>
        <div className="flex">
          <span className="m-2">
            {Icons.feedIcon}
          </span>
          <SidebarOption text='Feed' />
        </div>
      </NavLink>

      <NavLink to='/fray'>
        <div className="flex">
          <span className="m-2">
            {Icons.sparkles}
          </span>
          <SidebarOption text='The Fray' />
        </div>
      </NavLink>

      <NavLink to='/following'>
        <div className="flex">
          <span className="m-2">
            {Icons.frayIcon}
          </span>
          <SidebarOption text='Following' />
        </div>
      </NavLink>

      <NavLink to='/settings'>
        <div className="flex">
          <span className="m-2">
            {Icons.fingerprint}
          </span>
          <SidebarOption text='Settings' />
        </div>
      </NavLink>

      <NavLink to={`/${loggedInUser.username}`}>
        <div className="flex">
          <span className="m-2">
            {Icons.userIcon}
          </span>
          <SidebarOption text='Profile' />
        </div>
      </NavLink>

      <Form action="/logout" method="post">
        <div className="flex">
          <span className="m-2">
            {Icons.logoutIcon}
          </span>
          <button type="submit">
            <SidebarOption text='Logout' />
          </button>
        </div>
      </Form>

    </div>

  )


  


  return (
    <div className="flex my-5 p-5 rounded-3xl bg=transparent">
      {menu}
    </div>
  )
}

