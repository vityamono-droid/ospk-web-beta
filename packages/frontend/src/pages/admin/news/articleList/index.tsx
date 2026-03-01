import { useListArticlesQuery } from '@api/admin/articles/articles.api'
import AddButton from '@components/AddButton'
import useObjectState from '@hooks/useObjectState'
import type { ArticleDetails, ListArticlesQuery } from '@ospk/web-models/articles'
import { useNavigate } from 'react-router'
import ArticleTable from './article.table'
import { useState } from 'react'
import ArticleFilter from './article.filter'
import Stack from '@mui/material/Stack'
import RefreshButton from '@components/RefreshButton'
import Paginator from '@components/Paginator'
import useStatusEffect from '@hooks/useStatusEffect'

const defaultFilter = {
  limit: 50,
  offset: 0,
} as ListArticlesQuery

const ArticleListPage = () => {
  const navigate = useNavigate()

  const [articles, setArticles] = useState<ArticleDetails[]>([])
  const [filter, setFilter, setFilterProp] = useObjectState<ListArticlesQuery>({
    limit: 50,
    offset: 0,
  })

  const listResponse = useListArticlesQuery(filter, {
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setArticles(listResponse.data ?? []), [listResponse])

  const handleAddEdit = (id?: string) => {
    navigate(!!id ? id : 'add')
  }

  return (
    <>
      <ArticleFilter
        filter={filter}
        defaultValue={defaultFilter}
        onFilterChange={(value) => setFilter(value)}
        content={
          <>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <RefreshButton loading={listResponse.isLoading} onClick={listResponse.refetch} />
              <AddButton onClick={handleAddEdit} />
            </Stack>
            <Paginator
              limit={50}
              offset={filter.offset}
              count={articles.length}
              loading={listResponse.isLoading}
              onChange={(value) => setFilterProp({ offset: value })}
            />
          </>
        }
      />
      <ArticleTable data={articles} onRowClick={handleAddEdit} />
      <Paginator
        limit={50}
        offset={filter.offset}
        count={articles.length}
        loading={listResponse.isLoading}
        onChange={(value) => setFilterProp({ offset: value })}
      />
    </>
  )
}

export default ArticleListPage
