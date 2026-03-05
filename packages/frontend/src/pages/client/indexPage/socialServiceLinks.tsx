import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IndexHeader from './index.header'

import MinzdravRf from '@assets/minzdrav_rf.png'
import SlugKrovi from '@assets/slug_krovi.png'
import Gubernator from '@assets/gubernator74.png'
import Minzdrav74 from '@assets/minzdrav74.png'
import Zashpravpotreb from '@assets/zashpravpotreb.png'
import Roszdravnadzor74 from '@assets/roszdravnadzor74.png'

const services = [
  {
    label: 'Министерство здравоохранения Российской Федерации',
    image: MinzdravRf,
    link: 'https://www.rosminzdrav.ru/',
  },
  {
    label: 'Служба крови',
    image: SlugKrovi,
    link: 'http://donorsapiens.yadonor.ru/',
  },
  {
    label: 'Губернатор Челябинской Области',
    image: Gubernator,
    link: 'http://gubernator74.ru/',
  },
  {
    label: 'Правительство Челябинской Области',
    image: Minzdrav74,
    link: 'http://pravmin74.ru/',
  },
  {
    label: 'Министерство здравоохранения Челябинской Области',
    image: Minzdrav74,
    link: 'http://www.zdrav74.ru/',
  },
  {
    label: 'Министерство социальных отношений Челябинской Области',
    image: Zashpravpotreb,
    link: 'http://minsoc74.ru/',
  },
  {
    label: 'Территориальный орган роспотребнадзора по Челябинской Области',
    image: Minzdrav74,
    link: 'http://74reg.roszdravnadzor.ru/',
  },
  {
    label:
      'Управление федеральной службы по надзору в сфере защиты прав потребителей и благополучия человека по Челябинской Области',
    image: Roszdravnadzor74,
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
                <img height={80} src={item.image} />
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
