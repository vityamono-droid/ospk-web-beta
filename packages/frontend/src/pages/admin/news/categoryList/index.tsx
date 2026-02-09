import AddButton from '@components/AddButton'
import CategoryModal from './category.modal'
import CategoryTree from './category.tree'
import RefreshButton from '@components/RefreshButton'
import Stack from '@mui/material/Stack'

import { useEffect, useState } from 'react'
import { useListCategoriesQuery } from '@api/admin/articles/categories.api'

import type { ArticleCategory } from '@ospk/web-models/articles'

const CategoryListPage = () => {
  const listResponse = useListCategoriesQuery({})

  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [categories, setCategories] = useState<ArticleCategory[]>([])

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setCategories(listResponse.data)
  }, [listResponse.status])

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
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <RefreshButton loading={listResponse.isLoading} onClick={() => listResponse.refetch()} />
        <AddButton onClick={handleOpenModal} />
      </Stack>
      <CategoryTree data={categories} onRowClick={handleOpenModal} />
      {openModal && <CategoryModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CategoryListPage
