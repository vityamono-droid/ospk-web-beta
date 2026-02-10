import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'
import type { ServiceCategoryDetails } from '@ospk/web-models/services'

interface CategoryTableProps {
  data: ServiceCategoryDetails[]
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
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default CategoryTable
