import { useListClientsQuery } from '@api/admin/clients/clients.api'
import AddButton from '@components/AddButton'
import type { ClientDetails } from '@ospk/web-models/clients'
import { useEffect, useState } from 'react'
import ClientsTable from './clients.table'
import Paginator from '@components/Paginator'
import ClientModal from './client.modal'
import ClientFilter from './client.filter'
import Stack from '@mui/material/Stack'
import RefreshButton from '@components/RefreshButton'
import CogButton from '@components/CogButton'
import RoleModal from './role.modal'

const ClientListPage = ({ type }: { type: 'CLIENT' | 'STAFF' }) => {
  const [offset, setOffset] = useState(0)
  const [clients, setClients] = useState<ClientDetails[]>([])
  const [selected, setSelected] = useState<string>()
  const [openModal, setOpenModal] = useState(false)
  const [openRoles, setOpenRoles] = useState(false)

  const listResponse = useListClientsQuery({
    type: type,
    limit: 50,
    offset: offset
  }, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setClients(listResponse.data)
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
      <ClientFilter
        additional={
          <>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <RefreshButton onClick={listResponse.refetch} />
              <AddButton onClick={handleOpenModal} />
              <CogButton onClick={() => setOpenRoles(true)} />
            </Stack>
            <Paginator count={clients.length} limit={50} offset={offset} onChange={(offset) => setOffset(offset)} />
          </>
        }
      />
      <ClientsTable data={clients} onRowClick={handleOpenModal} />
      <Paginator count={clients.length} limit={50} offset={offset} onChange={(offset) => setOffset(offset)} />
      {openModal && <ClientModal id={selected} open={openModal} onClose={handleCloseModal} />}
      {openRoles && <RoleModal open={openRoles} onClose={() => setOpenRoles(false)} />}
    </>
  )
}

export default ClientListPage
