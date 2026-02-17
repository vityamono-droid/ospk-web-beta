import IndexButtons from './index.buttons'
import IndexNews from './index.news'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import MobileBanner from '@assets/banner_mobile.jpg'
import SocialServiceLinks from './socialServiceLinks'
import ClientCarousel from '@components/ClientCarousel'
import GosuslugiButton from './gosuslugi.button'

const IndexPage = () => {
  return (
    <>
      <Stack spacing={2}>
        <ClientCarousel placement={'HOME'} />
        <Stack flex={1}>
          <Paper sx={{ height: '100%' }}>
            <Stack p={2} spacing={{ xs: 2, md: 12 }}>
              <IndexButtons />
              <IndexNews />
              <SocialServiceLinks />
              <GosuslugiButton />
              <img width={'100%'} src={MobileBanner} />
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  )
}

export default IndexPage
