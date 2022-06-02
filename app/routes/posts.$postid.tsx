import type { Key } from "react"

import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import type { User } from "../api/models/user.models"
import type { Post } from "../api/models/post.models"
import type { Comment } from "~/api/models/comment.models"

import { getUser } from "../api/session.server"
import { getSinglePost, likeUnlikePost } from "../api/posts.server"
import { getReplies, likeUnlikeReply, newReply } from "~/api/replies.server"
import { findByUsername, findPublicUsers, findUserById } from "../api/user.server"
import { fetchComments, likeUnlikeComment, postNewComment } from "../api/comments.server"

import Feed from "~/components/Feed"
import PostBox from "~/components/PostBox"
import BackButton from "../components/BackButton"

export const loader: LoaderFunction = async ({ params, request }) => {
  const { postid } = params
  const publicUsers: User[] = await findPublicUsers()
  const post = await getSinglePost(postid)
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user
  const postUser = await findByUsername(post?.username!)

  async function getCommentsFeed(commentsArray: Comment[]) {
    try {
      let postFeed = []
      for (let comment of commentsArray) {
        let item = await fetchComments(comment)
        let commentUser = await findUserById(item.user)
        let replies = item.replies
        let replyItems: { replyItem: string[], replyUser: User }[] = []

        replies.forEach(async (reply: string | null) => {
          let replyItem = await getReplies(reply)
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
  const replyid = form.get('replyLike') as string

  if (_action === 'like') return likeUnlikePost(user?._id, postid)
  if (_action === 'commentLike') return likeUnlikeComment(loggedInUser?._id, commentid)
  if (_action === 'reply') return newReply({ user: loggedInUser?._id, body: values.body, commentid: values.commentid })
  if (_action === 'replyLike') return likeUnlikeReply(replyid, loggedInUser?._id)
  if (_action === 'comment') return postNewComment(post._id, loggedInUser?.username, body)
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

type Comments = {
  _id: Key | null | undefined;
  item: any;
  commentUser: User;
  replyItems: any
}

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
        <PostBox
          postValue='comment'
        />
        {commentData
          .map((comment: Comments) => (
            <div key={Math.random().toString(16).slice(2)}>
              <Feed
                key={comment._id}
                feed={comment.item}
                user={comment.commentUser}
                replies={comment.replyItems}
                inputName='commentLike'
                buttonValue='commentLike'
              />
            </div>
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
