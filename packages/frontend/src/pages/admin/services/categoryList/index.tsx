import AddButton from '@components/AddButton'
import Stack from '@mui/material/Stack'
import CategoryTable from './category.table'
import { useState } from 'react'
import CategoryModal from './category.modal'
import { useListCategoriesQuery } from '@api/admin/serviceCategories.api'

const CategoryList = () => {
  const listResponse = useListCategoriesQuery({})

  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string | undefined>()

  const handleRowClick = (id?: string) => {
    setSelected(id)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelected(undefined)
  }

  return (
    <>
      <Stack direction={'row'}>
        <AddButton title={'Добавить'} onClick={() => handleRowClick()} />
      </Stack>
      <CategoryTable data={listResponse.data ?? []} onRowClick={handleRowClick} />
      {openModal && <CategoryModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CategoryList
