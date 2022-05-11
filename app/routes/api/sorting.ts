import type { User } from "./models/user.models"

type CommentData = {
  [x: string]: any
  item: any,
  commentUser: User
}

type CreatedAt = {
  item: {
    createdAt: string | number | Date
  }
}

type CommentLikes = { 
  item: { 
    likes: string[] 
  }
}

export class Sorting {
  data: CommentData
  constructor(data: CommentData) {
    this.data = data
  }

  sortByNew() {
    return this.data.sort((a: CreatedAt, b: CreatedAt) =>
          new Date(b.item.createdAt).valueOf()
          - new Date(a.item.createdAt).valueOf())
  }

  mostLiked() {
    return this.data.sort((a: CommentLikes, b: CommentLikes) => 
      b.item.likes.length 
      - a.item.likes.length)
  }

  mostActivity() {
    console.log('finish me!')
  }
}



// let sortComments = new Sorting(commentData)
// let newest = sortComments.sortByNew()
// let likes = sortComments.mostLiked()
// let active = sortComments.mostActivity()


  // function sortByNew(data: CommentData): CommentData {
  //   return data
  //     .sort((a: CreatedAt, b: CreatedAt) =>
  //       new Date(b.item.createdAt).valueOf()
  //       - new Date(a.item.createdAt).valueOf())
  // }
  // sortByNew(commentData)

// .sort((a: any, b: any) => new Date(b.item.createdAt).valueOf() - new Date(a.item.createdAt).valueOf())

