import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IndexHeader from './index.header'

const services = [
  {
    label: 'Министерство здравоохранения Российской Федерации',
    image: 'minzdrav_rf.png',
    link: 'https://www.rosminzdrav.ru/',
  },
  {
    label: 'Служба крови',
    image: 'slug_krovi.png',
    link: 'http://donorsapiens.yadonor.ru/',
  },
  {
    label: 'Губернатор Челябинской Области',
    image: 'gubernator74.png',
    link: 'http://gubernator74.ru/',
  },
  {
    label: 'Правительство Челябинской Области',
    image: 'minzdrav74.png',
    link: 'http://pravmin74.ru/',
  },
  {
    label: 'Министерство здравоохранения Челябинской Области',
    image: 'minzdrav74.png',
    link: 'http://www.zdrav74.ru/',
  },
  {
    label: 'Министерство социальных отношений Челябинской Области',
    image: 'zashpravpotreb.png',
    link: 'http://minsoc74.ru/',
  },
  {
    label: 'Территориальный орган роспотребнадзора по Челябинской Области',
    image: 'minzdrav74.png',
    link: 'http://74reg.roszdravnadzor.ru/',
  },
  {
    label:
      'Управление федеральной службы по надзору в сфере защиты прав потребителей и благополучия человека по Челябинской Области',
    image: 'roszdravnadzor74.png',
    link: 'http://74.rospotrebnadzor.ru/',
  },
]

const SocialServiceLinks = () => {
  return (
    <Stack spacing={2}>
      <IndexHeader title={'Службы и сервисы'} />
      <Grid container>
        {services.map((item) => (
          <Grid key={item.link} size={{ xs: 6, lg: 3 }} component={Link} href={item.link} underline={'hover'}>
            <Stack spacing={2}>
              <Stack height={132} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <img height={80} src={`src/assets/${item.image}`} />
              </Stack>
              <Stack p={1} height={132} bgcolor={'divider'} textAlign={'center'} justifyContent={'center'}>
                <Typography variant={'body2'} textTransform={'uppercase'}>
                  {item.label}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default SocialServiceLinks
