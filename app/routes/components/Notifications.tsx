import { Link } from "@remix-run/react";
import type { User } from "../api/models/user.models";

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
  notificationType: string;
  navToPost: string;
  navToUser: string;
  message: string;
  commentid: string | null;
  postid: string | null;
}

export default function Notifications(props: Props) {
  const {
    to,
    from,
    notificationType,
    navToPost,
    navToUser,
    message,
    commentid,
    postid
  } = props

  return (
    <div className="flex items-center p-2">
      <div>
        <Link to={`/${from.user.username}`}>

          <img
            className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 mt-2 ml-2"
            src={from.user.profilePicture}
            alt=""
          />
        </Link>
      </div>
      <p className="mt-5">
        {message}
      </p>
    </div>
  )
}

// notification = {
//   to: {
//     userid: user._id,
//     username: user.username
//   },
//   from: {
//     userid: liker._id,
//     username: liker.username,
//     user: liker
//   },
//   notificationType: 'post_like',
//   navToPost: `/posts/${post._id}`,
//   navToUser: `/${liker.username}`,
//   message: `${liker.username} liked your post!`,
//   commentid: null,
//   postid: post._id,
// }
