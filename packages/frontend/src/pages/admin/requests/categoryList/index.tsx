import { useListCategoriesQuery } from '@api/admin/requests'
import useStatusEffect from '@hooks/useStatusEffect'
import type { CategoryDetails } from '@ospk/web-models/requests'
import { useState } from 'react'
import CategoryTable from './category.table'
import CategoryModal from './category.modal'
import Stack from '@mui/material/Stack'
import RefreshButton from '@components/RefreshButton'
import AddButton from '@components/AddButton'

const CategoryList = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [categories, setCategories] = useState<CategoryDetails[]>([])

  const listResponse = useListCategoriesQuery({}, {
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setCategories(listResponse.data ?? []), [listResponse])

  const handleOpenModal = (id?: string) => {
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
        <RefreshButton onClick={() => listResponse.refetch()} />
        <AddButton onClick={handleOpenModal} />
      </Stack>
      <CategoryTable data={categories} onRowClick={handleOpenModal} />
      {openModal && <CategoryModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CategoryList
