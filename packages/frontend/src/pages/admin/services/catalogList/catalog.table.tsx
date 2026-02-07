import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'
import type { ServiceCatalog } from '@ospk/web-models/services'

interface CatalogTableProps {
  data: ServiceCatalog[]
  onRowClick: (id: string) => void
}

const CatalogTable = ({ data, onRowClick }: CatalogTableProps) => {
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
          label: 'Кол-во услуг',
          value: 'services',
        },
        {
          label: 'Кол-во категорий',
          value: 'categories',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removed={item.removed} removedAt={item.removedAt} />,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default CatalogTable
