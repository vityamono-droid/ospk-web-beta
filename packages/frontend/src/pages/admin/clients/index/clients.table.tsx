import Avatar from '@mui/material/Avatar'
import DataGrid from '@components/DataGrid'
import FullNameCell from '@components/FullNameCell'
import IsDisabledChip from '@components/IsDisabledChip'
import PhoneChip from '@components/PhoneChip'

import { useNavigate } from 'react-router'

interface ClientTableProps {
  data: any[]
  selected: string[]
  onSelect: (value: string[]) => void
}

const ClientsTable = ({ data, selected, onSelect }: ClientTableProps) => {
  const navigate = useNavigate()

  const body = data.map((item) => ({
    ...item,
    avatar: <Avatar src={item.avatar} />,
    fullname: <FullNameCell fullname={item} />,
    disabled: <IsDisabledChip disabled={item.disabled} fullWidth />,
    phone: <PhoneChip phone={item.phone} />,
  }))

  return (
    <DataGrid
      head={[
        {
          value: 'avatar',
        },
        {
          label: 'ФИО',
          value: 'fullname',
        },
        {
          label: 'Статус',
          value: 'disabled',
          align: 'center',
        },
        {
          label: 'Телефон',
          value: 'phone',
          align: 'center',
        },
        {
          label: 'Email',
          value: 'email',
        },
      ]}
      body={body}
      selected={selected}
      onSelect={onSelect}
      onRowClick={(id) => navigate(id)}
    />
  )
}

export default ClientsTable
