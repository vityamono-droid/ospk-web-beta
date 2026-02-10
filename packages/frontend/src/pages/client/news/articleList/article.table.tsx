import Stack from '@mui/material/Stack'
import NewsListItem from '@components/NewsListItem'

import { type ArticleItem } from '@ospk/web-models/articles'

interface ArticleTableProps {
  data: ArticleItem[]
}

const ArticleTable = ({ data }: ArticleTableProps) => {
  return (
    <Stack spacing={2}>
      {data.map((item) => (
        <NewsListItem data={item} showCategories />
      ))}
    </Stack>
  )
}

export default ArticleTable
