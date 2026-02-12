import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'
import type { DepartmentDetails } from '@ospk/web-models/departments'
import formatPhone from '@utils/formatPhone'
import { useNavigate } from 'react-router'

interface DepartmentTableProps {
  data: DepartmentDetails[]
}

const DepartmentTable = ({ data }: DepartmentTableProps) => {
  const navigate = useNavigate()

  return (
    <DataGrid
      head={[
        {
          value: 'removedDisabled',
        },
        {
          label: 'Адрес',
          value: 'address',
        },
        {
          label: 'Телефон',
          value: 'phone',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          value: 'dateStats',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
        phone: item.phone ? formatPhone(item.phone) : 'Отсутствует',
        email: item.email ?? 'Отсутствует',
      }))}
      onRowClick={(id) => navigate(id)}
    />
  )
}

export default DepartmentTable
