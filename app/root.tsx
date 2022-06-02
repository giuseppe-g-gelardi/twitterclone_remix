import type { ReactNode } from "react";
import type { ShouldReloadFunction } from "@remix-run/react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { json } from "@remix-run/node";

import type {
  MetaFunction,
  LoaderFunction,
  LinksFunction,
} from "@remix-run/node";

import { getUser } from "./api/session.server";
import { findPublicUsers } from "./api/user.server";

import BottomNav from "./components/BottomNav";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import SuggestedUsers from "./components/SuggestedUsers";

import styles from './tailwind.css'
// import { ThemeProvider } from "./routes/context/themeContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Twitter Clone",
  viewport: "width=device-width,initial-scale=1",
});

export const unstable_shouldReload: ShouldReloadFunction = () => true;

type LoaderData = {
  loggedInUser: Awaited<ReturnType<typeof getUser>>;
  publicUsers: Awaited<ReturnType<typeof  findPublicUsers>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    loggedInUser: await getUser(request),
    publicUsers: await findPublicUsers()
  });
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

type Props = {
  children: ReactNode
}

export default function App() {

  return (
    <html lang="en" className='bg-white dark:bg-black text-black dark:text-white'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Layout({ children }: Props) {
  const { loggedInUser } = useLoaderData<LoaderData>()

  const authLayout = (
    <div className="flex font-helvetica relative place-content-center">

      <nav className="p-0 sm:px-2 md:px-3 col-span-3 place-content-right ml-auto hidden sm:block h-screen sticky top-0">
        <Sidebar />
      </nav>

      <div className="">
        <div className="col-span-3 border-0 sm:border-x-2 md:col-span-2 border-gray-500 w-full min-w-full max-w-[598px] xm:mr-auto">
          {children}
        </div>
        <div className="col-span-3 border-0 border-gray-500 w-full fixed bottom-0 sm:invisible sm:block md:col-span-2 max-w-[598px] left-0 right-0 items-center text-center">
          <BottomNav />
        </div>
      </div>

      <div className="col-span-3 mr-auto pl-4 place-content-left hidden sm:block md:min-w-[348px] xm:min-w-[288px] h-screen sticky top-0">
        {/* make hidden at xm instead of sm and center content */}
        <SearchBar />
        <SuggestedUsers />
      </div>

    </div>
  )

  const noAuthLayout = (
    <>
      {children}
    </>
  )

  return (
    <>
      {loggedInUser ? authLayout : noAuthLayout}
    </>
  )
}

// export default function AppWithProviders() {
//   return (
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//   )
// }


export function ErrorBoundary({ error }: any) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        {error.message}
        <Scripts />
      </body>
    </html>
  )
}
