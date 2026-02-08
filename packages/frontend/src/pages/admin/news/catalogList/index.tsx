import AddButton from '@components/AddButton'
import Stack from '@mui/material/Stack'
import CatalogsTable from './catalog.table'
import RefreshButton from '@components/RefreshButton'
import CatalogModal from './catalog.modal'

import { useEffect, useState } from 'react'
import { useListCatalogsQuery } from '@api/admin/articleCatalogs.api'

import type { ArticleCatalog } from '@ospk/web-models/articles'
import Paginator from '@components/Paginator'

const CatalogListPage = () => {
  const [offset, setOffset] = useState(0)

  const listResponse = useListCatalogsQuery({ limit: 50, offset }, {
    refetchOnMountOrArgChange: true,
  })

  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [catalogs, setCatalogs] = useState<ArticleCatalog[]>([])

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setCatalogs(listResponse.data)
  }, [listResponse.status])

  const handlePageChange = (offset: number) => setOffset(offset)

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
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <RefreshButton loading={listResponse.isLoading} onClick={() => listResponse.refetch()} />
          <AddButton onClick={handleOpenModal} />
        </Stack>
        <Paginator
          limit={50}
          offset={offset}
          count={catalogs.length}
          loading={listResponse.isLoading}
          onChange={handlePageChange}
        />
      </Stack>
      <CatalogsTable data={catalogs} onRowClick={handleOpenModal} />
      <Paginator
        limit={50}
        offset={offset}
        count={catalogs.length}
        loading={listResponse.isLoading}
        onChange={handlePageChange}
      />
      {openModal && <CatalogModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default CatalogListPage
