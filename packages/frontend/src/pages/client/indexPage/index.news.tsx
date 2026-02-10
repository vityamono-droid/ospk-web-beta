import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NewsListItem from '@components/NewsListItem'
import { useListArticlesQuery } from '@api/client/articles.api'
import { useEffect, useState } from 'react'
import type { ArticleItem } from '@ospk/web-models/articles'

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
      <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
        <Divider sx={{ width: 150 }} />
        <Typography variant={'h4'} fontWeight={'bold'}>
          Новости
        </Typography>
        <Divider sx={{ width: 150 }} />
      </Stack>
      <Grid container spacing={2}>
        {articles.map((item) => (
          <Grid size={{ xs: 12, sm: 6 }}>
            <NewsListItem key={item.id} showBanner data={item} />
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => navigate('/news')}>Все новости</Button>
    </Stack>
  )
}

export default IndexNews
