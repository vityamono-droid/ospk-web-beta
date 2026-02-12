import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const IndexHeader = ({ title }: { title: string }) => {
  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
      <Stack sx={{ width: { xs: '100%', sm: 150 } }}>
        <Divider />
      </Stack>
      <Typography variant={'h4'} fontWeight={'bold'}>
        {title}
      </Typography>
      <Stack sx={{ width: { xs: '100%', sm: 150 } }}>
        <Divider />
      </Stack>
    </Stack>
  )
}

export default IndexHeader
