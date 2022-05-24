import { Link } from "@remix-run/react";

import type { User } from "../api/models/user.models";

import Icons from "./Icons";

type Props = {
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

export default function Notifications(props: Props) {
  const {
    // to,
    from,
    action,
    navToPost,
    // navToUser,
    // commentid,
    // postid
  } = props

  return (
    <div className="flex items-center p-2.5 border-2">
      <div className="">
        <Link to={`/${from.user.username}`}>
          <img
            className="inline object-cover w-12 h-12 mr-2 rounded-full ml-2"
            src={from.user.profilePicture}
            alt=""
          />
        </Link>
      </div>
      <p className=" flex">
        {from.user.username}{' '}
        {from.user.isVerified ? (
          <span className='mr-1'>
            {Icons.verified}
          </span>
        ) : ''}{' '}

        {action.actionType === 'commented'
          ? 'commented on' : action.actionType} your&nbsp;
          {action.actionOn === 'post' ? 
          <Link 
            className="hover:text-rose-300 underline flex" 
            to={`${navToPost}`}>
              {action.actionOn}
          </Link> 
          : action.actionOn}!
      </p>
    </div>
  )
}
