import { Form, NavLink } from "@remix-run/react"

export const SidebarOption = ({ _active, text }: any) => {
  return (
    <div className="flex font-extrabold text-lg items-center hover:bg-slate-400 hover:rounded-3xl hover:text-indigo-600 hover:ease-out active:text-violet-400">
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
    
      <Form action="/logout" method="post">
        <button type="submit">
          <SidebarOption text='Logout' />
        </button>
      </Form>
    </div>
  )


  return (
    <div className="border-r flex my-5 p-5 rounded-3xl bg-slate-200 dark:bg-zinc-700">
      {menu}
    </div>
  )
}

