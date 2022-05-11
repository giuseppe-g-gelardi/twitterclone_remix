import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import type { User } from "./api/models/user.models";

import { getUser } from "./api/session.server";
import { 
  clearNotifications, 
  findPublicUsers 
} from "./api/user.server";

import BackButton from "./components/BackButton";
import Notifications from "./components/Notifications";

export const loader: LoaderFunction = async ({ request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user

  return { publicUsers, loggedInUser }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const { _action } = Object.fromEntries(form)
  const user: User | null = await getUser(request)

  if (_action === 'clearNotifications') return clearNotifications(user?._id)

  if (!_action) return null
}

type NotificationType = {
  to: {
    userid: string,
    username: string
  };
  from: {
    userid: string,
    username: string,
    user: User
  };
  action: {
    actionType: string,
    actionOn: string
  }
  navToPost: string;
  navToUser: string;
  message: string;
  commentid: string | null;
  postid: string | null;
}

export default function NotificationsPage() {
  const { loggedInUser } = useLoaderData()

  const notifications = loggedInUser.notifications;


  return (
    <>
<div className="flex flex-col min-w-[598px] max-w-[598px]">

      <BackButton 
        text='Notifications'
        />

        <Form replace method='put'>
          <input
            type='hidden'
            name='clearNotifications'
            value={loggedInUser._id}
            />
          <button
            type='submit'
            name='_action'
            value='clearNotifications'
            >
            Clear
          </button>
        </Form>

        <button className="bg-indigo-500" onClick={() => console.log(loggedInUser.notifications)}>
          logger
        </button>

        <div className="">
          {notifications.map((notification: NotificationType) => (
            <ul key={Math.random()}>
              <Notifications
                to={notification.to}
                from={notification.from}
                action={notification.action}
                navToPost={notification.navToPost}
                navToUser={notification.navToUser}
                message={notification.message}
                commentid={notification.commentid}
                postid={notification.postid}
              />
            </ul>
          ))}
        </div>
                </div>
    </>
  )
}



