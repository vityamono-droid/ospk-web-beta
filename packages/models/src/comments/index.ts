
export interface ListCommentsQuery {
  newsId?: string
  serviceId?: string
  forumPostId?: string
}

export interface CommentData {
  id: string
  fullName: string
  avatar: string | null
  content: string
  isStaff: boolean
  parentId: string | null
  upVotes: number
  downVotes: number
}

export interface UpsertCommentData {
  id: string
  parentId: string | null
  content: string
  newsId?: string
  serviceId?: string
  forumPostId?: string
}
