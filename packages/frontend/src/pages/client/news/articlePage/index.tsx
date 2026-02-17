import { useGetArticleQuery } from '@api/client/articles.api'
import PageHeader from '@components/PageHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import type { ArticleData } from '@ospk/web-models/articles'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import CategoryBreadcrumbs from '@components/NewsListItem/CategoryBreadcrumbs'
import ArticleLikeContent from '@components/ArticleLikeContent'

const ArticlePage = () => {
  const { id } = useParams()

  const [article, setArticle] = useState<ArticleData>()

  const { data, isSuccess, isLoading, status } = useGetArticleQuery(id!, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    setArticle(data)
  }, [status])

  return (
    <>
      {isLoading && <CircularProgress />}
      {!!article && (
        <Stack width={'100%'} spacing={2}>
          <Stack direction={'row'} spacing={2} alignContent={'center'} justifyContent={'space-between'}>
            <PageHeader title={'Назад'} />
            <Stack>
              <CategoryBreadcrumbs items={article.categories} showCategories />
            </Stack>
          </Stack>
          <ArticleLikeContent item={article} />
        </Stack>
      )}
    </>
  )
}

export default ArticlePage
