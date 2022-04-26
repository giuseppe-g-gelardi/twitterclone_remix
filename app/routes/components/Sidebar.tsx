import { NavLink } from "@remix-run/react"

export const SidebarOption = ({ _active, text }: any) => {
  return (
    // <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
    <div className="flex font-extrabold text-lg mr-6 items-center hover:bg-slate-400 hover:rounded-3xl hover:text-indigo-600 hover:ease-out active:text-violet-400">
    {/* <div> */}


        <h2>{text}</h2>
    </div>
  )
}

export default function Sidebar() {

  const menu = (
    <div>
      <NavLink to='/home'>
        <SidebarOption active text='Home' />
      </NavLink>
      <NavLink to='/search'>
        <SidebarOption text='Search' />
      </NavLink>
      <NavLink to='/feed'>
        <SidebarOption text='Feed' />
      </NavLink>
      <NavLink to='/fray'>
        <SidebarOption text='The Fray' />
      </NavLink>
      <NavLink to='/following'>
        <SidebarOption text='Following' />
      </NavLink>
      <NavLink to='/settings'>
        <SidebarOption text='Settings' />
      </NavLink>
      <NavLink
        to='/login'
        onClick={() =>
          `${localStorage.removeItem('token')}${window.location.reload()}`
        }
      >
        <SidebarOption text='Logout' />
      </NavLink>
    </div>
  )




  return (
    <div className="border-r border-indigo-400 flex mt-5 pr-5">
      {menu}
    </div>
  )
}




// {/* <NavLink
// to={'/home'}
// prefetch="intent"
// className={({ isActive }) =>
//   `w-full hover:underline p-3 rounded border border-slate-400 inline-block ${isActive
//     ? 'bg-slate-300 text-black font-bold border-2'
//     : 'text-blue-500 '
//   } `
// }
// >
// {text}
// </NavLink> */}
