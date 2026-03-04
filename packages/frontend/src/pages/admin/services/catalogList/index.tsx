import AddButton from '@components/AddButton'
import CatalogTable from './catalog.table'
import CatalogModal from './catalog.modal'
import Stack from '@mui/material/Stack'
import RefreshButton from '@components/RefreshButton'

import { useState } from 'react'
import { useListCatalogsQuery } from '@api/admin/services/catalogs.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { ServiceCatalogDetails } from '@ospk/web-models/services'

const CatalogListPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string | undefined>()
  const [catalogs, setCatalogs] = useState<ServiceCatalogDetails[]>([])

  const listResponse = useListCatalogsQuery({})

  useStatusEffect(() => setCatalogs(listResponse.data ?? []), [listResponse])

  const handleOpenModal = (id?: string) => {
    setSelected(id)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelected(undefined)
    setOpenModal(false)
  }

  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <RefreshButton onClick={() => listResponse.refetch()} />
        <AddButton title={'Добавить'} onClick={() => handleOpenModal()} />
      </Stack>
      <CatalogTable data={catalogs} onRowClick={handleOpenModal} />
      {openModal && <CatalogModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CatalogListPage
