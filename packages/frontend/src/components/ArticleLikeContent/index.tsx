import IconCount from '@components/IconCount'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ViewsIcon from '@mui/icons-material/Visibility'

interface ArticleLikeItem {
  label: string
  banner: string | null
  content: string
  statistics: number
  createdAt: Date
}

interface ArticleLikeContentProps {
  item: ArticleLikeItem
}

const ArticleLikeContent = ({ item }: ArticleLikeContentProps) => {
  return (
    <Stack spacing={2}>
      <Stack py={4}>
        <Typography variant={'h3'} textAlign={'center'}>
          {item.label}
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={2} justifyContent={'center'}>
        <Typography>{new Date(item.createdAt).toLocaleString()}</Typography>
        <Divider orientation={'vertical'} />
        <IconCount icon={ViewsIcon} count={item.statistics} autoHide />
      </Stack>
      {item.banner && (
        <Stack px={16}>
          <img width={'100%'} src={item.banner} style={{ aspectRatio: 2 / 1 }} />
        </Stack>
      )}
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
    </Stack>
  )
}

export default ArticleLikeContent
