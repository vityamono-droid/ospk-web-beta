import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'
import type { ServiceCategory } from '@ospk/web-models/services'

interface CategoryTableProps {
  data: ServiceCategory[]
  onRowClick: (id: string) => void
}

const CategoryTable = ({ data, onRowClick }: CategoryTableProps) => {
  return (
    <DataGrid
      head={[
        {
          value: 'removedDisabled',
        },
        {
          label: 'Название',
          value: 'label',
        },
        {
          label: 'Кол-во сервисов',
          value: 'services',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled removed={item.removed} disabled={item.disabled} removedAt={item.removedAt} />,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default CategoryTable
