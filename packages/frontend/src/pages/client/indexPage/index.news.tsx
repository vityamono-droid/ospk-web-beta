import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import NewsListItem from '@components/NewsListItem'
import { useListArticlesQuery } from '@api/client/articles.api'
import { useEffect, useState } from 'react'
import type { ArticleItem } from '@ospk/web-models/articles'
import IndexHeader from './index.header'

const IndexNews = () => {
  const navigate = useNavigate()

  const [articles, setArticles] = useState<ArticleItem[]>([])

  const listResponse = useListArticlesQuery({
    limit: 4,
    offset: 0,
  })

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setArticles(listResponse.data)
  }, [listResponse.status])

  return (
    <Stack spacing={2}>
      <IndexHeader title={'Новости'} />
      <Grid container spacing={2}>
        {articles.map((item) => (
          <Grid key={item.id} size={{ xs: 12, md: 6 }}>
            <NewsListItem showBanner data={item} />
          </Grid>
        ))}
        {(listResponse.isLoading || articles.length == 0) &&
          [0, 1, 2, 3].map((_, index) => (
            <Grid key={`${index}`} size={{ xs: 12, md: 6 }}>
              <NewsListItem showBanner />
            </Grid>
          ))}
      </Grid>
      <Button onClick={() => navigate('/news')}>Все новости</Button>
    </Stack>
  )
}

export default IndexNews
