export interface User {
  _id: string,
  username: string,
  email: string,
  password: string,
  firstname?: string,
  lastname?: string,
  bio?: string,
  location?: string,
  profilePicture: string,
  profileBanner: string,
  protected: boolean,
  followers: [],
  following: [],
  isAdmin: boolean,
  isVerified: boolean,
  posts: [],
  notifications: [],
  theme: string, // will be boolean in future
  createdAt?: string,
  updatedAt?: string
}
