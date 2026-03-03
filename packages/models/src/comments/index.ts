
export interface ListCommentsQuery {
  newsId?: string
  serviceId?: string
  forumPostId?: string
}

export interface VoteData {
  direction: 'UP_VOTE' | 'DOWN_VOTE'
  profileId: string | null
}

export interface CommentData {
  id: string
  fullName: string
  avatar: string | null
  content: string
  isStaff: boolean
  parentId: string | null
  votes: VoteData[]
}

export interface UpsertCommentData {
  parentId: string | null
  content: string
  newsId?: string
  serviceId?: string
  forumPostId?: string
}
