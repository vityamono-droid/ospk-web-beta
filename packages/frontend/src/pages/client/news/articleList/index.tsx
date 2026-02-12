import Stack from '@mui/material/Stack'
import ArticleSidebar from './article.sidebar'
import Paginator from '@components/Paginator'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import NewsListItem from '@components/NewsListItem'

import { useGetCatalogQuery, useListArticlesQuery } from '@api/client/articles.api'
import { useClientContext } from '@apps/client.context'
import { useEffect, useState } from 'react'

import type { ArticleItem, CatalogData } from '@ospk/web-models/articles'
import CircularProgress from '@mui/material/CircularProgress'

const ArticleListPage = () => {
  const context = useClientContext()

  const [catalog, setCatalog] = useState<CatalogData>()
  const [articles, setArticles] = useState<ArticleItem[]>([])
  const [offset, setOffset] = useState(0)

  const listResponse = useListArticlesQuery(
    {
      catalogId: context.articles.selected,
      limit: 6,
      offset: offset,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  const getResponse = useGetCatalogQuery(context.articles.selected!, {
    skip: !context.articles.selected,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setArticles(listResponse.data)
  }, [listResponse.status])

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setCatalog(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (!context.articles.selected) {
      setCatalog(undefined)
    }
  }, [context.articles.selected])

  return (
    <Stack direction={{ xs: 'column', md: 'row-reverse' }} spacing={2} flex={1}>
      <Stack width={{ xs: '100%', md: '30%' }}>
        <ArticleSidebar />
      </Stack>
      <Stack width={{ xs: '100%', md: '70%' }}>
        <Stack flex={1}>
          <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Stack p={2} height={'100%'} spacing={2} justifyContent={'space-between'}>
              <Stack spacing={2}>
                <Stack direction={'row'}>
                  <Typography variant={'h4'} fontWeight={'bold'}>
                    Новости
                  </Typography>
                  <Paginator count={articles.length} limit={6} offset={offset} onChange={(value) => setOffset(value)} />
                </Stack>
                {!getResponse.isLoading && catalog && (
                  <>
                    <Divider />
                    <Stack direction={'row'} spacing={2}>
                      {catalog.banner && (
                        <Stack>
                          <img width={150} height={100} src={catalog.banner} />
                        </Stack>
                      )}
                      <Stack>
                        <Typography variant={'h5'}>{catalog.label}</Typography>
                        {catalog.description && <Typography>{catalog.description}</Typography>}
                      </Stack>
                    </Stack>
                  </>
                )}
                {listResponse.isLoading ? (
                  <CircularProgress />
                ) : (
                  <Stack spacing={2}>
                    {articles.map((item) => (
                      <NewsListItem data={item} showCategories />
                    ))}
                  </Stack>
                )}
              </Stack>
              <Stack>
                <Paginator count={articles.length} limit={6} offset={offset} onChange={(value) => setOffset(value)} />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ArticleListPage
