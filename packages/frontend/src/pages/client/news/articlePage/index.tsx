import { useGetArticleQuery } from '@api/client/articles.api'
import IconCount from '@components/IconCount'
import PageHeader from '@components/PageHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import type { ArticleData } from '@ospk/web-models/articles'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import ViewsIcon from '@mui/icons-material/Visibility'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CategoryBreadcrumbs from '@components/NewsListItem/CategoryBreadcrumbs'

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
          <Stack py={4}>
            <Typography variant={'h3'} textAlign={'center'}>
              {article.label}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2} justifyContent={'center'}>
            <Typography>{new Date(article.createdAt).toLocaleString()}</Typography>
            <Divider orientation={'vertical'} />
            <IconCount icon={ViewsIcon} count={article.statistics} autoHide />
          </Stack>
          {article.banner && (
            <Stack px={16}>
              <img width={'100%'} src={article.banner} style={{ aspectRatio: 2 / 1 }} />
            </Stack>
          )}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </Stack>
      )}
    </>
  )
}

export default ArticlePage
