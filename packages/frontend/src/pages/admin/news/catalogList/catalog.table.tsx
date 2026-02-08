import DataGrid from '@components/DataGrid'
import RemovedDisabled from '@components/RemovedDisabled'

import type { ArticleCatalog } from '@ospk/web-models/articles'

interface CatalogsTableProps {
  data: ArticleCatalog[]
  onRowClick: ValueCallback<string>
}

const CatalogsTable = ({ data, onRowClick }: CatalogsTableProps) => {
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
          label: 'Кол-во новостей',
          value: 'news',
        },
        {
          label: 'Кол-во категорий',
          value: 'categories',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default CatalogsTable
