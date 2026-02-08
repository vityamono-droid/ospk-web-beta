export interface ListArticleCategory {
  catalogId?: string
  activeOnly?: boolean
}

export interface ArticleCategory {
  id: string
  parentId: string | null
  label: string
  disabled: boolean
  news: number
  categories: number
  removedAt: Date | null
}

export interface UpsertArticleCategory {
  catalogId: string
  parentId: string | null
  label: string
  disabled: boolean
  removedAt: Date | null
}
