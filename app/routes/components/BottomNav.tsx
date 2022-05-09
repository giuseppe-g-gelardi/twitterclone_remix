import { NavLink } from '@remix-run/react'
import React from 'react'
import Icons from './Icons'

export default function BottomNav() {

  const bottomBar = (
    <div className="px-7 bg-zinc-700 shadow-lg">
      <div className="flex">
        <div className="flex-1 group">
          <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
            <span className="block px-1 pt-1 pb-1">
              <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-2">
                <NavLink to='/home'>
                  {Icons.homeIcon}
                </NavLink>
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
                <NavLink to='/search'>
                  {Icons.searchIcon}
                </NavLink>
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
                <NavLink to='/messages'>
                  {Icons.mailIcon}
                </NavLink>
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
                <NavLink to='/notifications'>
                  {Icons.bellIcon}
                </NavLink>
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
                <NavLink to='/settings'>
                  {Icons.cogFilled}
                </NavLink>
              </span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )



  return (
    <div>{bottomBar}</div>
  )
}

