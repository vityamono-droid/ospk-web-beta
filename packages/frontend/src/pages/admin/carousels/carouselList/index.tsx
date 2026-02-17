import { useListCarouselsQuery } from '@api/admin/carousels/carousels.api'
import AddButton from '@components/AddButton'
import DataGrid from '@components/DataGrid'
import RefreshButton from '@components/RefreshButton'
import RemovedDisabled from '@components/RemovedDisabled'
import useStatusEffect from '@hooks/useStatusEffect'
import Stack from '@mui/material/Stack'
import type { CarouselDetails } from '@ospk/web-models/carousels'
import { useState } from 'react'
import CarouselModal from './carousel.modal'

const placementMapping = {
  HOME: 'Главная',
  SERVICES: 'Сервисы',
  NEWS: 'Новости',
  PROFILE: 'Профиль',
}

const CarouselListPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [carousels, setCarousels] = useState<CarouselDetails[]>([])

  const listResponse = useListCarouselsQuery({})

  useStatusEffect(() => setCarousels(listResponse.data ?? []), [listResponse])

  const handleOpenModal = (id?: string) => {
    setSelected(id)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelected(undefined)
  }

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1}>
        <RefreshButton onClick={() => listResponse.refetch()} />
        <AddButton onClick={handleOpenModal} />
      </Stack>
      <DataGrid
        head={[
          {
            value: 'removedDisabled',
          },
          {
            label: 'Название',
            value: 'label',
          },
          {
            label: 'Позиция',
            value: 'placement',
          },
          {
            label: 'Дата начала',
            value: 'durationFrom',
          },
          {
            label: 'Дата конца',
            value: 'durationTo',
          },
        ]}
        body={carousels.map((item) => ({
          ...item,
          removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
          placement: placementMapping[item.placement],
          durationFrom: item.durationFrom && new Date(item.durationFrom).toLocaleDateString(),
          durationTo: item.durationTo && new Date(item.durationTo).toLocaleDateString(),
        }))}
        onRowClick={handleOpenModal}
      />
      {openModal && <CarouselModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </Stack>
  )
}

export default CarouselListPage
