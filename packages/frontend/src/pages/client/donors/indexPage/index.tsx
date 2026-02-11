import StaticContent from '@components/StaticContent'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const IndexPage = () => {

  return (
    <>
      <Paper>
        <Stack p={2} spacing={2}>
          <Typography variant={'h4'} fontWeight={'bold'}>
            Прием доноров
          </Typography>
          <Divider sx={{ mx: -2 }} />
          <StaticContent file={'donors.html'} />
        </Stack>
      </Paper>
    </>
  )
}

export default IndexPage
