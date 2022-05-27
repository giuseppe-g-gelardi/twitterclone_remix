import type { Key } from "react"
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
        const commentUser = await findUserById(item.user)
        postFeed.push({ item, commentUser })
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
  const { _action } = Object.fromEntries(form)

  const postid = form.get('like') as string
  if (_action === 'like') return likeUnlikePost(user?._id, postid)

  const commentid = form.get('commentLike') as string
  if (_action === 'commentLike') return likeUnlikeComment(loggedInUser?._id, commentid)

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
}

type Comments = {
  _id: Key | null | undefined;
  item: Post;
  commentUser: User
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
          inputName='like'
          buttonValue='like'
        />
      </div>
      <div className="mt-2.5">
        <PostBox />
        {commentData
          .map((comment: Comments) => (
            <Feed
              key={comment._id}
              feed={comment.item}
              user={comment.commentUser}
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
  // export function ErrorBoundary({ error }: any) {
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Details</div>
      <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Uh oh... Sorry something went wrong!
        </div>
        {/* <p>{error?.message}</p> */}
      </div>
    </div>
  );
}
