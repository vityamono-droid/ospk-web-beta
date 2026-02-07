import { useListServicesQuery } from '@api/admin/services.api'
import AddButton from '@components/AddButton'
import Paginator from '@components/Paginator'
import Stack from '@mui/material/Stack'
import type { Service } from '@ospk/web-models/services'
import { useEffect, useState } from 'react'
import ServiceFilter from './service.filter'
import ServiceTable from './service.table'
import { useNavigate } from 'react-router'

const ServiceList = () => {
  const navigate = useNavigate()
  const [offset, setOffset] = useState(0)
  const [services, setService] = useState<Service[]>([])

  const listResponse = useListServicesQuery(
    {
      limit: 50,
      offset: offset,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setService(listResponse.data)
  }, [listResponse.status])

  return (
    <>
      <ServiceFilter
        additional={
          <>
            <Stack direction={'row'}>
              <AddButton title={'Добавить'} onClick={() => navigate('service')} />
            </Stack>
            <Paginator limit={50} offset={offset} count={services.length} onChange={(offset) => setOffset(offset)} />
          </>
        }
      />
      <ServiceTable data={services} />
      <Paginator limit={50} offset={offset} count={services.length} onChange={(offset) => setOffset(offset)} />
    </>
  )
}

export default ServiceList
