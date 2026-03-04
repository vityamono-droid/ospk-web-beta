import AddButton from '@components/AddButton'
import AtomButton from '@components/AtomButton'
import Paginator from '@components/Paginator'
import Stack from '@mui/material/Stack'
import ServiceTable from './service.table'
import RefreshButton from '@components/RefreshButton'
import UnitsModal from './unit.modal'

import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useListServicesQuery } from '@api/admin/services/services.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { ServiceDetails } from '@ospk/web-models/services'

const ServiceList = () => {
  const navigate = useNavigate()

  const [offset, setOffset] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [services, setServices] = useState<ServiceDetails[]>([])

  const listResponse = useListServicesQuery(
    {
      limit: 50,
      offset: offset,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  useStatusEffect(() => setServices(listResponse.data ?? []), [listResponse])

  return (
    <>
      <Stack flex={1} spacing={2} overflow={'hidden'}>
        {/* Filters */}
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <RefreshButton onClick={() => listResponse.refetch()} />
            <AtomButton onClick={() => setOpenModal(true)} />
            <AddButton title={'Добавить'} onClick={() => navigate('new')} />
          </Stack>
          <Paginator limit={50} offset={offset} count={services.length} onChange={(offset) => setOffset(offset)} />
        </Stack>
        {/* Table */}
        <Stack flex={1} overflow={'hidden'}>
          <ServiceTable data={services} />
        </Stack>
        {/* Bottom */}
        <Stack direction={'row'}>
          <Paginator limit={50} offset={offset} count={services.length} onChange={(offset) => setOffset(offset)} />
        </Stack>
      </Stack>
      {openModal && <UnitsModal open={openModal} onClose={() => setOpenModal(false)} />}
    </>
  )
}

export default ServiceList
