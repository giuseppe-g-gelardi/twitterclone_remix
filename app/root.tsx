import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type {
  MetaFunction,
  LoaderFunction,
  LinksFunction
} from "@remix-run/node";

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
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
