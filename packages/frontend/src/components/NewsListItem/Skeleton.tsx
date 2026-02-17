import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface NewsListItemProps {
  showCategories?: boolean
  showBanner?: boolean
}

const NewsListItemSkeleton = ({ showBanner, showCategories }: NewsListItemProps) => {
  return (
    <Paper variant={'outlined'}>
      <Stack p={2} direction={'row'} spacing={2}>
        {showBanner && (
          <Stack minWidth={150}>
            <Skeleton variant={'rounded'} height={150} />
          </Stack>
        )}
        <Stack width={'100%'} spacing={2}>
          <Stack direction={'row'} spacing={2} width={'100%'}>
            <Stack width={'100%'}>
              <Typography variant={'h6'}>
                <Skeleton />
              </Typography>
              <Stack direction={'row'} spacing={1}>
                {showCategories && (
                  <>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Skeleton variant={'rounded'} width={50} />
                      <Typography color={'textSecondary'}>/</Typography>
                      <Skeleton variant={'rounded'} width={50} />
                    </Stack>
                    <Divider orientation={'vertical'} />
                  </>
                )}
                <Skeleton variant={'rounded'} width={24} height={24} />
              </Stack>
            </Stack>
            <Stack minWidth={56}>
              <Skeleton variant={'rounded'} height={56} />
            </Stack>
          </Stack>
          <Stack>
            <Skeleton variant={'text'} />
            <Skeleton variant={'text'} width={'60%'} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default NewsListItemSkeleton
