import { Link } from "@remix-run/react"

export const SidebarOption = ({ active, text }: any) => {
  return (
    <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
      <h2>{text}</h2>
    </div>
  )
}

export default function Sidebar() {

  const menu = (
    <div style={{ marginLeft: 'auto' }}>
      <Link to='/home'>
        <SidebarOption active  text='Home' />
      </Link>
      <Link to='/search'>
        <SidebarOption  text='Search' />
      </Link>
      <Link to='/feed'>
        <SidebarOption text='Feed' />
      </Link>
      <Link to='/fray'>
        <SidebarOption text='The Fray' />
      </Link>
      <Link to='/following'>
        <SidebarOption text='Following' />
      </Link>
      <Link to='/settings'>
        <SidebarOption text='Settings' />
      </Link>
      <Link
        to='/login'
        onClick={() =>
          `${localStorage.removeItem('token')}${window.location.reload()}`
        }
      >
        <SidebarOption text='Logout' />
      </Link>
    </div>
  )




  return (
    <div className="border-r border-indigo-400 flex mt-5 pr-5">
      {menu}
    </div>
  )
}
