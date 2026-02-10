import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import GroupsIcon from '@mui/icons-material/Groups3'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import InfoIcon from '@mui/icons-material/Info'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const navButtons = [
  {
    label: 'Прием доноров',
    icon: GroupsIcon,
    link: '/donors/1',
  },
  {
    label: 'План мероприятий',
    icon: LocalShippingIcon,
    link: '/about/1',
  },
  {
    label: 'Донорский светофор',
    icon: WaterDropIcon,
    link: '/donors/2',
  },
  {
    label: 'Рекомендации',
    icon: InfoIcon,
    link: '/donors/3',
  },
]

const IndexButtons = () => {
  return (
    <Grid container spacing={2} px={{ xs: 2, md: 8, lg: 16 }} py={{ xs: 2, md: 6 }}>
      {navButtons.map((item) => (
        <Grid
          key={item.link}
          component={Button}
          variant='outlined'
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ aspectRatio: { xs: 'auto', md: 1 } }}>
          <Stack width={'100%'} direction={{ xs: 'row', sm: 'column' }} spacing={2} alignItems={'center'}>
            <item.icon sx={{ fontSize: 48 }} />
            <Typography>{item.label}</Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}

export default IndexButtons
