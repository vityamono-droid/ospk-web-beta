import AddButton from '@components/AddButton'
import CategoryTable from './category.table'
import CategoryModal from './category.modal'
import Stack from '@mui/material/Stack'

import { useState } from 'react'
import { useListCategoriesQuery } from '@api/admin/services/categories.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { ServiceCategoryDetails } from '@ospk/web-models/services'
import RefreshButton from '@components/RefreshButton'

const CategoryList = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string | undefined>()
  const [categories, setCategories] = useState<ServiceCategoryDetails[]>([])

  const listResponse = useListCategoriesQuery({})

  useStatusEffect(() => setCategories(listResponse.data ?? []), [listResponse])

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
      <Stack direction={'row'} spacing={2}>
        <RefreshButton onClick={() => listResponse.refetch()} />
        <AddButton title={'Добавить'} onClick={() => handleRowClick()} />
      </Stack>
      <CategoryTable data={categories} onRowClick={handleRowClick} />
      {openModal && <CategoryModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CategoryList
