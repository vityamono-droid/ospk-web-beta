import { Link as RouterLink } from 'react-router'
import { useGetServiceQuery } from '@api/client/services.api'
import useStatusEffect from '@hooks/useStatusEffect'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { ServiceDataDetails } from '@ospk/web-models/services'
import { useState } from 'react'
import { useParams } from 'react-router'
import { LineChart } from '@mui/x-charts/LineChart'
import PageHeader from '@components/PageHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import OrderIcon from '@mui/icons-material/LocalMall'
import DepartmentIcon from '@mui/icons-material/LocalShipping'
import CardIcon from '@mui/icons-material/CreditCard'
import LocationIcon from '@mui/icons-material/LocationPin'
import ServiceContent from './service.content'
import ServiceHeader from './service.header'
import ServicePrice from './service.price'
import CommentView from '@components/CommentView'

const ServicePage = () => {
  const { id } = useParams()

  const [service, setService] = useState<ServiceDataDetails>()
  const getResponse = useGetServiceQuery(id!, {
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setService(getResponse.data), [getResponse])

  return (
    <>
      {service && (
        <Paper>
          <title>{service.label}</title>
          <Stack p={2} spacing={2}>
            <ServiceHeader service={service} />
            <ServicePrice data={service.priceHistory} />
            <ServiceContent content={service.content} />
            <CommentView serviceId={id} />
          </Stack>
        </Paper>
      )}
    </>
  )
}

export default ServicePage
