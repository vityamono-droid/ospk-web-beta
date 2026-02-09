import AddButton from '@components/AddButton'
import Stack from '@mui/material/Stack'
import CatalogTable from './catalog.table'
import { useListCatalogsQuery } from '@api/admin/services/catalogs.api'
import CatalogModal from './catalog.modal'
import { useState } from 'react'

const CatalogListPage = () => {
  const listResponse = useListCatalogsQuery({})

  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string | undefined>()

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
        <AddButton title={'Добавить'} onClick={() => handleOpenModal()} />
      </Stack>
      <CatalogTable data={listResponse.data ?? []} onRowClick={handleOpenModal} />
      {openModal && <CatalogModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CatalogListPage
