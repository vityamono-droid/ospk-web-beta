import { useListClientsMutation } from '@api/admin/client.api'
import AddButton from '@components/AddButton'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import ClientsFilter from './clients.filter'
import ClientsTable from './clients.table'
import Paginator from '@components/Paginator'
import ActionButton from '@components/ActionButton'

const IndexPage = () => {
  const [listClients, response] = useListClientsMutation()

  const [offset, setOffset] = useState(0)
  const [clients, setClients] = useState([] as any[])
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    listClients({ limit: 50, offset })
  }, [])

  useEffect(() => {
    if (!response.isSuccess) {
      return
    }

    setClients(response.data)
  }, [response.status])

  const handleOffset = (value: number) => {
    setOffset(value)

    listClients({ limit: 50, offset: value })
  }

  return (
    <>
      {/* Filters */}
      <ClientsFilter
        additional={
          <Box sx={{ gap: 2, width: '100%', display: 'flex', alignItems: 'center' }}>
            <AddButton title={'Добавить'} />
            <ActionButton
              actions={[
                {
                  label: 'asd',
                  value: 'asd',
                },
                {
                  label: 'asd',
                  value: 'asd',
                  underline: true,
                },
                {
                  label: 'asd',
                  value: 'asd',
                },
                {
                  label: 'asd',
                  value: 'asd',
                },
              ]}
              count={selected.length}
              onClear={() => {}}
            />
            <Paginator
              limit={50}
              offset={offset}
              count={clients.length ?? 0}
              loading={response.isLoading}
              onChange={handleOffset}
            />
          </Box>
        }
      />
      {/* Table */}
      <ClientsTable data={clients} selected={selected} onSelect={setSelected} />
      {/* Bottom paginator */}
      <Paginator limit={50} offset={offset} count={clients.length ?? 0} loading={response.isLoading} onChange={handleOffset} />
    </>
  )
}

export default IndexPage
