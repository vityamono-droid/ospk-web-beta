import IndexCarousel from './index.carousel'
import IndexButtons from './index.buttons'
import IndexNews from './index.news'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

const IndexPage = () => {
  return (
    <>
      <Stack spacing={2}>
        <IndexCarousel />
        <Stack flex={1}>
          <Paper sx={{ height: '100%' }}>
            <Stack p={2} spacing={2}>
              <IndexButtons />
              <IndexNews />
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  )
}

export default IndexPage
