import AddButton from '@components/AddButton'
import AtomButton from '@components/AtomButton'
import ClientFilter from './client.filter'
import ClientModal from './client.modal'
import ClientsTable from './clients.table'
import Paginator from '@components/Paginator'
import RefreshButton from '@components/RefreshButton'
import RoleModal from './role.modal'
import Stack from '@mui/material/Stack'

import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import { useListClientsQuery } from '@api/admin/clients/clients.api'
import { useState } from 'react'

import type { ListClientDetailsQuery, ClientDetails } from '@ospk/web-models/clients'

const ClientListPage = ({ type }: { type: 'CLIENT' | 'STAFF' }) => {
  const [clients, setClients] = useState<ClientDetails[]>([])
  const [selected, setSelected] = useState<string>()

  const [openModal, setOpenModal] = useState(false)
  const [openRoles, setOpenRoles] = useState(false)

  const [filters, setFilters, setFilterProp] = useObjectState<ListClientDetailsQuery>({
    type: type,
    offset: 0,
    limit: 50,
  })

  const listResponse = useListClientsQuery(filters)

  useStatusEffect(() => setClients(listResponse.data ?? []), [listResponse])

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
      <ClientFilter
        content={
          <>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <AtomButton onClick={() => setOpenRoles(true)} />
              <RefreshButton onClick={listResponse.refetch} />
              <AddButton onClick={handleOpenModal} />
            </Stack>
            <Paginator
              count={clients.length}
              limit={50}
              offset={filters.offset}
              onChange={(value) => setFilterProp({ offset: value })}
            />
          </>
        }
        filters={filters}
        setFilters={setFilters}
        setFilterProp={setFilterProp}
      />
      <Stack flex={1}>
        <ClientsTable data={clients} onRowClick={handleOpenModal} />
      </Stack>
      <Paginator
        count={clients.length}
        limit={50}
        offset={filters.offset}
        onChange={(value) => setFilterProp({ offset: value })}
      />
      {openModal && <ClientModal id={selected} open={openModal} onClose={handleCloseModal} />}
      {openRoles && <RoleModal open={openRoles} onClose={() => setOpenRoles(false)} />}
    </>
  )
}

export default ClientListPage
