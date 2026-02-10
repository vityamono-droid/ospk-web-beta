import CategoryBreadcrumbs from './CategoryBreadcrumbs'
import DateCube from '@components/DateCube'
import IconCount from '@components/IconCount'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ViewsIcon from '@mui/icons-material/Visibility'

import { useNavigate } from 'react-router'

import type { ArticleItem } from '@ospk/web-models/articles'

interface NewsListItemProps {
  data: ArticleItem
  showCategories?: boolean
  showBanner?: boolean
}

const NewsListItem = ({ data, showBanner, showCategories }: NewsListItemProps) => {
  const navigate = useNavigate()

  return (
    <Paper
      variant={'outlined'}
      sx={{ cursor: 'pointer', '& :hover': { bgcolor: '#f5f5ff' } }}
      onClick={() => navigate(`/news/${data.id}`)}>
      <Stack p={2} direction={'row'} spacing={2}>
        {/* Banner */}
        {showBanner && !!data.banner && (
          <Stack>
            <img height={150} width={150} src={data.banner} />
          </Stack>
        )}
        {/* Content */}
        <Stack width={'100%'} spacing={2}>
          {/* Title */}
          <Stack direction={'row'} spacing={2}>
            <Stack width={'100%'} sx={{ overflow: 'hidden' }}>
              <Typography noWrap color={'secondary'} variant={'h6'}>
                {data.label}
              </Typography>
              {/* Categories */}
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <CategoryBreadcrumbs items={data.categories} showCategories={showCategories} />
                <IconCount icon={ViewsIcon} count={data.statistics} autoHide />
              </Stack>
            </Stack>
            <DateCube date={data.createdAt} />
          </Stack>
          {/* Description */}
          {!!data.description && (
            <Stack>
              <Typography>{data.description}</Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default NewsListItem
