import type { Key } from "react"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

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

  // async function getRepliesFeed(comments: any) {
  //   try {
  //     let replyFeed = []
  //     for (let comment of comments) {
  //       if (comment.item.replies.length > 0) {
  //         let item = await getCommentReplies(comment.item._id)
  //         let replies = item.replies

  //         let replyUsers = []
  //         for (let reply of replies) {
  //           let replyUser = await findUserById(reply.user)
  //           replyUsers.push(replyUser)
  //         }
          
  //         replyFeed.push({replies, replyUsers})
  //       }
  //     }
  //     return replyFeed

  //   } catch (error: any) {
  //     throw new Error(error)
  //   }
  // }
  // const replyData = await getRepliesFeed(commentData)

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
          // replies={replyData}
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
              // replies={replyData}
            />
          ))}
      </div>
    </div>
  )
}
