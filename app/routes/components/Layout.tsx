import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { ReactNode } from "react";

import type { User } from "../api/models/user.models";
import type { Post } from "../api/models/post.models";
import { findByUsername, updateUserProfile } from "../api/user.server";
import { getUserPosts } from "../api/posts.server";
import { getUser } from "../api/session.server";

import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/SuggestedUsers";
import SearchBar from "../components/SearchBar";
import BottomNav from "./BottomNav";

export const loader: LoaderFunction = async ({ params, request }: any) => {
  const user: User = await findByUsername(params)
  const posts: Post[] = await getUserPosts(user.username)
  const sessionUser: User | null = await getUser(request)
  const data = { sessionUser }
  const loggedInUser = data.sessionUser

  return { user, posts, loggedInUser }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const { _action, ...values } = Object.fromEntries(form)

  if (_action === 'update') return updateUserProfile(loggedInUser?.username, { ...values })
}

type Proptype = {
  children: ReactNode,
}

export default function Layout({ children }: Proptype) {


  return (
    <div className="font-sans flex">

        <div className="col-span-3 place-content-right ml-auto">
          <Sidebar />
        </div>


        <div className="col-span-3 border-2 border-gray-500 md:w-6/12 lg:3/12 xl:2/12 mx-4 sm:max-w-screen-sm">
          {/* <BottomNav /> */}
          {children}
        </div>


        <div className="col-span-3 place-content-left mr-auto">
          <SearchBar />
          <SuggestedUsers />
        </div>



    </div>
  )
}



      // {/* <div className="col-span-4 border-2 border-gray-500 w-6/12 mx-4"> */}
      // <div className={({ isMobile }) =>
      //   `${isMobile
      //     ? 'col-span-12 border-2 border-gray-500 w-full mx-4 place-content-center'
      //     : 'col-span-4 border-2 border-gray-500 w-6/12 mx-4'
      //   }
      // `
      // }

      // const [isMobile, setIsMobile] = useState<boolean>(false)

      // function handleResize() {
      //   if (window.innerWidth > 920) {
      //     console.log('mobile view')
      //     setIsMobile(true)
      //   } else {
      //     console.log('standard view')
      //     setIsMobile(false)
      //   }
      // }
    
      // useEffect(() => {
      //   window.addEventListener('resize', handleResize)
      // }, [isMobile])
