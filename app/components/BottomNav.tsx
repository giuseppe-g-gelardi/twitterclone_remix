import { NavLink, useLoaderData } from '@remix-run/react'
import type { ReactNode } from 'react'
import type { User } from '../routes/api/models/user.models'

import Icons from './Icons'

export const SidebarItem = ({
  children, link
}: {
  children: ReactNode,
  link: string
}) => {

  const baseNavItem = `flex dark:text-gray-300 text-gray-700 p-1`

  const ActiveNavItem = ({ isActive }: { isActive: boolean }) => `${baseNavItem} 
  ${isActive ? 'bg-gray-500 text-white rounded-full' : null}`

  return (
    <NavLink to={link} className={ActiveNavItem}>
      {children}
    </NavLink>
  )
}

type RootLoaderData = { loggedInUser: User }

export default function BottomNav() {
  const { loggedInUser } = useLoaderData<RootLoaderData>()

  const bottomBar = (
    <div className="px-7 dark:bg-neutral-900 bg-neutral-300 shadow-lg w-full min-w-full max-w-[598px] rounded-sm">
      <div className="flex">
        <div className="flex-1 group">
          <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
            <span className="block px-1 pt-1 pb-1">
              <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-2">
                <SidebarItem link='/home' >
                  {Icons.homeIcon}
                </SidebarItem>
              </span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div className="flex-1 group">
          <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
            <span className="block px-1 pt-1 pb-1">
              <i className="far fa-compass text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-2">
                <SidebarItem link='/search'>
                  {Icons.searchIcon}
                </SidebarItem>
              </span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div className="flex-1 group">
          <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
            <span className="block px-1 pt-1 pb-1">
              <i className="far fa-search text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-2">
                <SidebarItem link='/messages'>
                  {Icons.mailIcon}
                </SidebarItem>
              </span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div className="flex-1 group">
          <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
            <span className="block px-1 pt-1 pb-1">
              <i className="far fa-search text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-2">
                <SidebarItem link='/notifications'>
                  {loggedInUser.notifications.length ?
                    <span className="text-rose-600 dark:text-rose-400">{Icons.bellFilled}</span> : <span>{Icons.bellIcon}</span>}
                </SidebarItem>
              </span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div className="flex-1 group">
          <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
            <span className="block px-1 pt-1 pb-1">
              <i className="far fa-cog text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-2">
                <SidebarItem link='/settings'>
                  {Icons.cogFilled}
                </SidebarItem>
              </span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className=''>{bottomBar}</div>
  )
}

