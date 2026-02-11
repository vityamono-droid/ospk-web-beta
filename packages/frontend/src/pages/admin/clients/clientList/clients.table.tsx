import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'
import type { ClientDetails } from '@ospk/web-models/clients'
import formatPhone from '@utils/formatPhone'

interface ClientsTableProps {
  data: ClientDetails[]
  onRowClick: ValueCallback<string>
}

const ClientsTable = ({ data, onRowClick }: ClientsTableProps) => {
  return (
    <DataGrid
      head={[
        {
          value: 'removedDisabled',
        },
        {
          label: 'ФИО',
          value: 'fullname',
        },
        {
          label: 'Телефон',
          value: 'phone',
        },
        {
          label: 'Email',
          value: 'email',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled removedAt={item.removedAt} />,
        phone: formatPhone(item.phone),
        fullname: `${item.lastName} ${item.firstName} ${item.patronymic}`,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default ClientsTable
