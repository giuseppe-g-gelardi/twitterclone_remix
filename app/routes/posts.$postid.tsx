import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import type { User } from "./api/models/user.models"

import { getSinglePost, likeUnlikePost } from "./api/posts.server"
import { getUser } from "./api/session.server"
import { fetchComments, likeUnlikeComment, postNewComment } from "./api/comments.server"
import { findByUsername, findPublicUsers, findUserById } from "./api/user.server"

import Feed from "./components/Feed"
import PostBox from "./components/PostBox"
import BackButton from "./components/BackButton"
import Layout from "./components/Layout"

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

export default function SinglePostPage() {
  const { post, commentData, postUser } = useLoaderData()

  return (

    <Layout>
      <BackButton
        text='Post'
      />
      <div className="border-b-2">
        <Feed
          feed={post}
          user={postUser}
          inputName='like'
          buttonValue='like'
        />
      </div>
      <div className="mt-2.5">
        <PostBox />
        {commentData
          .sort((a: any, b: any) => new Date(b.item.createdAt).valueOf() - new Date(a.item.createdAt).valueOf())
          .map((comment: { _id: any; item: any; commentUser: any }) => (
            <Feed
              key={comment._id}
              feed={comment.item}
              user={comment.commentUser}
              inputName='commentLike'
              buttonValue='commentLike'
            />
          ))}
      </div>
    </Layout>
  )
}
