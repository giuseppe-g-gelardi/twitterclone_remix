import {
  Links,
  LiveReload,
  Meta,
  useLoaderData,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  Form,
} from "@remix-run/react";

import type { MetaFunction, LoaderFunction, LinksFunction } from "@remix-run/node";

import { getUser } from "./routes/api/session.server";
import styles from './tailwind.css'

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Twitter Clone",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  const data = { user }

  return data
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  const { user } = useLoaderData()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <>
          {user ? (
            <Form action='/logout' method="post">
              <button 
                type='submit'
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              >
                Logout {user.username}
              </button>
            </Form>
          ) : (
            <Link to='/login'>
              <button>Login</button>
            </Link>
          )}
        </>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export default function App() {
//   return (
//     <Document>
//       <Layout>
//         <Outlet />
//       </Layout>
//     </Document>
//   );
// }


// export function ErrorBoundary({ error }: any) {
//   console.log(error)
//   return (
//     <Document>
//       <Layout>
//         <h1>Error</h1>
//         <p>{error.message}</p>
//       </Layout>
//     </Document>
//   )
// }

// function Document({ children, title }: any) {
//   return (
//     <html lang='en'>
//       <head>
//         <meta charSet='utf-8' />
//         <meta name='viewport' content='width=device-width,initial-scale=1' />
//         <Meta />
//         <Links />
//         <title>{title ? title : 'Remix Twitter Clone'}</title>
//       </head>
//       <body>
//         {children}
//         {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   )
// }

// function Layout({ children }: any) {
//   const {user} = useLoaderData()

//   return (
//     <>
//     <button
//       onClick={() => console.log(user)}
//     >
//       ROOT logger
//     </button>
//       <div className="title">
//         {user ?
//           (
//             <p>yes</p>
//           ) : (
//             <p>no</p>
//           )
//         }
//       </div>
//       <div className="container">{children}</div>
//     </>
//   )
// }
