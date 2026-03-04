import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'
import Chip from '@mui/material/Chip'
import type { EmployeeDetails } from '@ospk/web-models/employees'

interface EmployeeTableProps {
  data: EmployeeDetails[]
  onRowClick: ValueCallback<string>
}

const EmployeeTable = ({ data, onRowClick }: EmployeeTableProps) => {
  return (
    <DataGrid
      head={[
        {
          value: 'removedDisabled',
        },
        {
          label: 'Фамилия',
          value: 'lastName',
        },
        {
          label: 'Имя',
          value: 'firstName',
        },
        {
          label: 'Отчество',
          value: 'patronymic',
        },
        {
          label: 'Образование',
          value: 'level',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
        level: (
          <Chip
            size={'small'}
            label={item.level === 'HIGHER' ? 'Высшее' : item.level === 'SECONDARY' ? 'Среднее' : 'Начальное'}
          />
        ),
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default EmployeeTable
