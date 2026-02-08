import Stack from '@mui/material/Stack'
import ArticleTable from './article.table'
import ArticleSidebar from './article.sidebar'
import { useListCatalogsQuery } from '@api/client/articles.api'
import { useEffect, useState } from 'react'
import { ArticleCatalogNav } from '@ospk/web-models/articles'

const ArticleListPage = () => {
  const [catalogs, setCatalogs] = useState<ArticleCatalogNav[]>([])

  const listResponse = useListCatalogsQuery({})

  useEffect(() => {
    if (!listResponse.isSuccess) {

    }
  }, [listResponse.status])

  return (
    <Stack direction={'row'} spacing={2}>
      <Stack width={'100%'}>
        <ArticleTable />
      </Stack>
      <Stack width={'40%'}>
        <ArticleSidebar />
      </Stack>
    </Stack>
  )
}

export default ArticleListPage
