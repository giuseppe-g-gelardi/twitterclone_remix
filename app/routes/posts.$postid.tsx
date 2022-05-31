import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import type { Post } from "../api/models/post.models"

import { getSinglePost, likeUnlikePost } from "../api/posts.server"
import { getUser } from "../api/session.server"
import { fetchComments, likeUnlikeComment, postNewComment } from "../api/comments.server"
import { findByUsername, findPublicUsers, findUserById } from "../api/user.server"

import Feed from "~/components/Feed"
import PostBox from "~/components/PostBox"
import BackButton from "../components/BackButton"
import { getReplies, newReply } from "~/api/replies.server"

export const loader: LoaderFunction = async ({ params, request }: any) => {
  const publicUsers: User[] = await findPublicUsers()
  const post = await getSinglePost(params.postid)
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const postUser = await findByUsername({ username: post?.username })

  async function getCommentsFeed(commentsArray: any) {
    try {
      let postFeed = []
      for (let comment of commentsArray) {
        let item = await fetchComments(comment)
        let commentUser = await findUserById(item.user)
        let replies = item.replies

        let replyItems: { replyItem: any, replyUser: User }[] = []

        replies.forEach(async (reply: string | null) => {
          let replyItem = await getReplies(reply)
          // let replyUser = await findUserById(replyItem.user)
          // replyItems.push({replyItem, replyUser})
          replyItems.push(replyItem)
        })

        postFeed.push({ item, commentUser, replyItems })
      }
      return postFeed

    } catch (error: any) {
      throw new Error(error)
    }
  }
  const commentData = await getCommentsFeed(post.comments)

  return { post, loggedInUser, commentData, publicUsers, postUser }
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()
  const body = form.get('body')
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const post = await getSinglePost(params.postid)
  const { _action, ...values } = Object.fromEntries(form)
  const postid = form.get('like') as string
  const commentid = form.get('commentLike') as string

  if (_action === 'like') return likeUnlikePost(user?._id, postid)
  if (_action === 'commentLike') return likeUnlikeComment(loggedInUser?._id, commentid)
  if (_action === 'reply') return newReply({user: loggedInUser?._id, body: values.body, commentid: values.commentid})

  // TODO: set up specific action for new comment
  const newComment = await postNewComment(post._id, loggedInUser?.username, body)

  return newComment
}

type LoaderData = {
  post: Post
  commentData: CommentData
  postUser: User
  replyData: any
}

type CommentData = {
  [x: string]: any
  item: any,
  commentUser: User
  replies: any
}

// type Comments = {
//   _id: Key | null | undefined;
//   item: Post;
//   commentUser: User
// }

export default function SinglePostPage() {
  const { post, commentData, postUser } = useLoaderData<LoaderData>()

  return (
    <div className="flex flex-col sm:min-w-[598px] sm:max-w-[598px]">
      <BackButton
        text='Post'
      />
      <div className="border-b-2">
        <Feed
          key={commentData._id}
          feed={post}
          user={postUser}
          replies={null}
          inputName='like'
          buttonValue='like'
        />
      </div>
      <div className="mt-2.5">
        <PostBox />
        {commentData
          .map((comment: any) => (
            <Feed
              key={comment._id}
              feed={comment.item}
              user={comment.commentUser}
              replies={comment.replyItems}
              inputName='commentLike'
              buttonValue='commentLike'
            />
          ))}
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="mb-3">
        <div className="text-3xl mb-2">Details</div>
        <div className="p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {caught.statusText}
          </div>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  throw new Error('Unkown error');
}

export function ErrorBoundary() {
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Details</div>
      <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Uh oh... Sorry something went wrong!
        </div>
      </div>
    </div>
  );
}
