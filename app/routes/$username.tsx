import { useCatch, useLoaderData } from "@remix-run/react";

import type {
  ActionFunction,
  LoaderFunction,
  UploadHandler
} from "@remix-run/node";

import {
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler
} from "@remix-run/node";

import type { User } from "../api/models/user.models";
import type { Post } from "../api/models/post.models";

import {
  findByUsername,
  findPublicUsers,
  followAndUnfollowUsers,
  updateUserProfile,
  uploadProfileBanner,
  uploadProfileImage
} from "../api/user.server";
import { getUserPosts, likeUnlikePost } from "../api/posts.server";
import { getUser } from "../api/session.server";
import { uploadImage } from "../api/utils.server";

import ProfileHeader from "../components/ProfileHeader";
import Feed from "../components/Feed";
import BackButton from "../components/BackButton";


export const loader: LoaderFunction = async ({ params, request }: any) => {
  const publicUsers: User[] = await findPublicUsers()
  const user: User = await findByUsername(params)
  const posts: Post[] = await getUserPosts(user.username)
  const sessionUser: User | null = await getUser(request)
  const data = { sessionUser }
  const loggedInUser = data.sessionUser

  return { user, posts, loggedInUser, publicUsers }
}

export const action: ActionFunction = async ({ request, params }) => {
  const uploadBannerHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "banner_img") return null;
      const uploadedImage: any = await uploadImage(data)
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );
  const req = request.clone()

  const uploadProfileHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "profile_img") return null;
      const uploadedImage: any = await uploadImage(data)
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );
  const profileReq = request.clone()

  const bannerData = await parseMultipartFormData(req, uploadBannerHandler);
  const bannerSrc = bannerData.get("banner_img");

  const profileData = await parseMultipartFormData(profileReq, uploadProfileHandler)
  const profileSrc = profileData.get("profile_img")

  const form = await request.formData()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user

  const { _action, ...values } = Object.fromEntries(form)
  const postid = form.get('like') as string
  const followname = form.get('follow') as string

  if (_action === 'follow') return followAndUnfollowUsers(params.username, followname)
  if (_action === 'update') return updateUserProfile(loggedInUser?.username, { ...values })
  if (_action === 'like') return likeUnlikePost(user?._id, postid)
  if (_action === 'banner_img') return uploadProfileBanner(params.username, bannerSrc?.toString())
  if (_action === 'profile_img') return uploadProfileImage(params.username, profileSrc?.toString())

  if (!_action) return null
}

type LoaderData = {
  user: User,
  posts: Post[]
}

export default function UserPage() {
  const { posts, user } = useLoaderData<LoaderData>()

  return (
    <>
      <BackButton text={user.username} />

      <ProfileHeader />
      {posts
        .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
        .map((post: any) => (
          <Feed
            key={post._id}
            feed={post}
            user={user}
            inputName='like'
            buttonValue='like'
          />
        ))}
    </>
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
        <p>That page doesnt seem to exist</p>
      </div>
    </div>
  );
}
