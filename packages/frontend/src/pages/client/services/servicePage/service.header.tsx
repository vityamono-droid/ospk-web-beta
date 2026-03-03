import { Link as RouterLink } from 'react-router'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'

import OrderIcon from '@mui/icons-material/LocalMall'
import DepartmentIcon from '@mui/icons-material/LocalShipping'
import CardIcon from '@mui/icons-material/CreditCard'
import LocationIcon from '@mui/icons-material/LocationPin'
import NoImageIcon from '@mui/icons-material/HideImage'
import ShareIcon from '@mui/icons-material/Share'

import type { ServiceDataDetails } from '@ospk/web-models/services'
import { enqueueSnackbar } from 'notistack'
import Chip from '@mui/material/Chip'
import { useAuthContext } from '@pages/auth/auth.context'

const ServiceHeader = ({ service, onOrderClick }: { service: ServiceDataDetails; onOrderClick: Callback }) => {
  const { account } = useAuthContext()

  const breadcrumbs = [
    <Link component={RouterLink} to={`/services`} variant={'body2'}>
      {service.catalog}
    </Link>,
    !!service.category && (
      <Link component={RouterLink} to={`/services#${service.categoryId}`} variant={'body2'}>
        {service.category}
      </Link>
    ),
    <Typography variant={'body2'}>{service.label}</Typography>,
  ].filter((item) => !!item)

  const handleShare = () => {
    navigator.clipboard.readText().then((data) => {
      if (location.href === data) {
        return
      }

      navigator.clipboard.writeText(location.href).then(() => {
        enqueueSnackbar({
          variant: 'success',
          message: 'Ссылка скопирована',
          autoHideDuration: 2000,
        })
      })
    })
  }

  return (
    <Stack spacing={1}>
      {/* Header */}
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant={'h5'} fontWeight={'bold'}>
          {service.label}
        </Typography>
        {service.forLegals && <Chip size={'small'} label={'Для юр. лиц'} />}
      </Stack>
      {/* Info */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {/* Image */}
        <Stack width={'100%'} spacing={2}>
          {!!service.banner ? (
            <Stack spacing={2}>
              <img height={400} src={service.banner} style={{ objectFit: 'contain' }} />
              <Typography color={'gray'} variant={'body2'} textAlign={'center'}>
                Внешний вид товара может отличаться от изображённого на фотографии
              </Typography>
            </Stack>
          ) : (
            <Stack height={400} border={'4px dotted gray'} alignItems={'center'} justifyContent={'center'}>
              <NoImageIcon sx={{ color: 'gray', fontSize: 64 }} />
            </Stack>
          )}
        </Stack>
        {/* Price and departments */}
        <Stack width={{ xs: '100%', md: 450 }} spacing={2}>
          {/* Price */}
          <Paper variant={'outlined'}>
            <Stack p={2} spacing={4}>
              <Stack spacing={1}>
                <Typography color={'gray'} variant={'body2'}>
                  Цена:
                </Typography>
                <Stack direction={'row'} spacing={1} alignItems={'flex-start'}>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    {service.price} ₽
                  </Typography>
                  <Typography>{service.amountType === 'FINITE' && !!service.unit && `за ${service.unit}`}</Typography>
                </Stack>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <Button
                  fullWidth
                  disabled={!account || service.departments.length == 0}
                  variant={'outlined'}
                  endIcon={<OrderIcon />}
                  onClick={onOrderClick}>
                  Заказать
                </Button>
                <IconButton size={'small'} onClick={handleShare}>
                  <ShareIcon fontSize={'small'} />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
          {/* Departments */}
          <Paper variant={'outlined'}>
            <Stack p={2} spacing={2}>
              <Stack spacing={1}>
                <Stack direction={'row'} spacing={1}>
                  <DepartmentIcon color={'primary'} fontSize={'small'} />
                  <Typography noWrap>Доступно в отделах:</Typography>
                </Stack>
                {/* Department list */}
                {service.departments.map((item) => (
                  <Stack pl={3} direction={'row'} spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={1}>
                      <LocationIcon fontSize={'small'} sx={{ color: 'gray' }} />
                      <Typography noWrap variant={'body2'}>
                        {item.address.slice(0, item.address.indexOf(','))}
                      </Typography>
                    </Stack>
                    <Typography color={'gray'} variant={'body2'}>
                      {item.available}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack direction={'row'} spacing={1}>
                <CardIcon color={'primary'} fontSize={'small'} />
                <Typography noWrap>Оплата при получении</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ServiceHeader
