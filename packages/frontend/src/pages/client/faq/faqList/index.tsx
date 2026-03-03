import AddButton from '@components/AddButton'
import FaqCategories from './faq.categories'
import FaqTable from './faq.table'
import Stack from '@mui/material/Stack'
import RefreshButton from '@components/RefreshButton'

import { useState } from 'react'
import { useGetCategoryQuery, useListCategoriesQuery } from '@api/client/requests/categories.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { CategoryData, RequestDataShort } from '@ospk/web-models/requests'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import FaqModal from './faq.modal'

const FaqListPage = () => {
  const navigate = useNavigate()

  const [category, setCategory] = useState<string>()
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [requests, setRequests] = useState<RequestDataShort[]>([])
  const [openModal, setOpenModal] = useState(false)

  const listCategoriesResponse = useListCategoriesQuery({})
  const getCategoryResponse = useGetCategoryQuery(category!, {
    skip: !category,
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => {
    setCategories(listCategoriesResponse.data ?? [])
    setCategory((listCategoriesResponse.data ?? [])[0]?.id ?? '')
  }, [listCategoriesResponse])

  useStatusEffect(() => setRequests(getCategoryResponse.data ?? []), [getCategoryResponse])

  const handleRequestAdd = (id?: string) => {
    if (!!id) {
      navigate(id)
    } else {
      setOpenModal(true)
    }
  }

  return (
    <>
      <Stack flex={1} direction={'row'} spacing={2}>
        <Stack width={'100%'}>
          <Paper sx={{ flex: 1 }}>
            <Stack p={2} spacing={2}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant={'h5'} fontWeight={'bold'}>
                  Вопросы и ответы
                </Typography>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <RefreshButton />
                  <AddButton onClick={handleRequestAdd} />
                </Stack>
              </Stack>
              <FaqTable data={requests} onRowClick={handleRequestAdd} />
            </Stack>
          </Paper>
        </Stack>
        <Stack width={'40%'}>
          <FaqCategories data={categories} selected={category} onChange={(value) => setCategory(value)} />
        </Stack>
      </Stack>
      {openModal && <FaqModal open={openModal} onClose={() => setOpenModal(false)} />}
    </>
  )
}

export default FaqListPage
