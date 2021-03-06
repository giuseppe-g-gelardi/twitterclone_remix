import { useCatch, useLoaderData } from "@remix-run/react";

import type {
  ActionFunction,
  LoaderFunction,
  UploadHandler
} from "@remix-run/node";

import {
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_createFileUploadHandler as createFileUploadHandler
  
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
import { getUser } from "../api/session.server";
import { uploadImage } from "../api/utils.server";
import { getUserPosts, likeUnlikePost } from "../api/posts.server";

import Feed from "../components/Feed";
import BackButton from "../components/BackButton";
import ProfileHeader from "../components/ProfileHeader";

export const loader: LoaderFunction = async ({ params, request }) => {
  const publicUsers: User[] = await findPublicUsers()
  const user: User = await findByUsername(params.username!)
  const posts: Post[] = await getUserPosts(user.username)
  const sessionUser: User | null = await getUser(request)
  const data = { sessionUser }
  const loggedInUser = data.sessionUser

  return { user, posts, loggedInUser, publicUsers }
}

export const action: ActionFunction = async ({ request, params }) => {
  const uploadBannerHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "banner_img") return;
      const uploadedImage: { secure_url: string } = await uploadImage(data)
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );
  const bannerReq = request.clone()
  const bannerData = await parseMultipartFormData(bannerReq, uploadBannerHandler);
  const bannerSrc = bannerData.get("banner_img");

  const uploadProfileHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "profile_img") return;
      const uploadedImage: { secure_url: string } = await uploadImage(data)
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );
  const profileReq = request.clone()
  const profileData = await parseMultipartFormData(profileReq, uploadProfileHandler)
  const profileSrc = profileData.get("profile_img")

  const form = await request.formData()
  const user: User | null = await getUser(request)
  const data = { user }
  const loggedInUser = data.user

  const { _action, ...values } = Object.fromEntries(form) as Record<string, string>
  const postid = form.get('like') as string
  const followname = form.get('follow') as string

  if (_action === 'follow') return followAndUnfollowUsers(params.username, followname)
  if (_action === 'update') return updateUserProfile(loggedInUser?.username, { ...values })
  if (_action === 'like') return likeUnlikePost(user?._id, postid)

  if (_action === 'banner_img') return uploadProfileBanner(params.username, bannerSrc?.toString())
  if (_action === 'profile_img') return uploadProfileImage(params.username, profileSrc?.toString())
}

type LoaderData = {
  user: User,
  posts: Post[]
}

export default function UserPage() {
  const { posts, user } = useLoaderData<LoaderData>()

  return (
    <div className="sm:min-w-[598px] sm:max-w-[598px]">
      <BackButton text={user.username} />

      <ProfileHeader />
      {posts
        .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
        .map((post) => (
          <div key={post._id}>
            <Feed
              key={post._id}
              feed={post}
              user={user}
              inputName='like'
              buttonValue='like'
              replies={undefined}
            />
          </div>
        ))}
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="mb-3 min-w-[598px]">
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

// export function ErrorBoundary() {
//   return (
//     <div className="mb-3 min-w-[598px]">
//       <div className="text-3xl mb-2">Details</div>
//       <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
//         <div className="text-gray-700 font-bold text-xl mb-2">
//           Uh oh... Sorry something went wrong!
//         </div>
//         <p>That page doesnt seem to exist</p>
//       </div>
//     </div>
//   );
// }
