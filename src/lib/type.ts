export interface ITweets {
  id: string
  userId: string
  username: string
  tweet: string
  photo?: string
  createAt: number
}

export interface IEditTweet {
  isEdit: boolean
  tweet: string
  documentId: string
}