import { useGetServiceQuery } from '@api/client/services.api'
import useStatusEffect from '@hooks/useStatusEffect'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { ServiceDataDetails } from '@ospk/web-models/services'
import { useState } from 'react'
import { useParams } from 'react-router'
import ServiceContent from './service.content'
import ServiceHeader from './service.header'
import ServicePrice from './service.price'
import CommentView from '@components/CommentView'
import OrderModal from './order.modal'

const ServicePage = () => {
  const { id } = useParams()

  const [openModal, setOpenModal] = useState(false)
  const [service, setService] = useState<ServiceDataDetails>()
  const getResponse = useGetServiceQuery(id!, {
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setService(getResponse.data), [getResponse])

  return (
    <>
      {service && (
        <>
          <Paper>
            <title>{service.label}</title>
            <Stack p={2} spacing={2}>
              <ServiceHeader service={service} onOrderClick={() => setOpenModal(true)} />
              <ServicePrice data={service.priceHistory} />
              <ServiceContent content={service.content} />
              <CommentView serviceId={id} />
            </Stack>
          </Paper>
          {openModal && <OrderModal service={service} serviceId={id!} open={openModal} onClose={() => setOpenModal(false)} />}
        </>
      )}
    </>
  )
}

export default ServicePage
