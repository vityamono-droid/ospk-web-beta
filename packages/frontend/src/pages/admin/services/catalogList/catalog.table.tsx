import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'

import type { ServiceCatalogDetails } from '@ospk/web-models/services'

interface CatalogTableProps {
  data: ServiceCatalogDetails[]
  onRowClick: ValueCallback<string>
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
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default CatalogTable
