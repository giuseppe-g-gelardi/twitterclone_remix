import type { LoaderFunction } from "@remix-run/node"
import type { User } from "./api/models/user.models"
import { redirect } from "@remix-run/node"
import { getUser } from "./api/session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user: User | null = await getUser(request)
  if (!user) return redirect('/login')

  return redirect('/home')
}

// ! as of now, index.tsx will redirect to either Login
// ! or if logged in, the users home page
// ! no real need for a default export in this case
// ! but am saving what was there just incase plans change
// export default function Index() {
//   return (
//     <div className="text-red-500">
//       <h1>Hello, Remix!</h1>
//     </div>
//   )
// }
