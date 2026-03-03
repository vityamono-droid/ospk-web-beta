import DataGrid from '@components/DataGrid'
import IconCount from '@components/IconCount'
import Chip from '@mui/material/Chip'

import ViewsIcon from '@mui/icons-material/Visibility'
import CommentsIcon from '@mui/icons-material/Comment'

import type { RequestDataShort } from '@ospk/web-models/requests'

interface FaqTableProps {
  data: RequestDataShort[]
  onRowClick?: ValueCallback<string>
}

const FaqTable = ({ data, onRowClick }: FaqTableProps) => {
  return (
    <DataGrid
      head={[
        {
          label: 'Название',
          value: 'label',
        },
        {
          label: 'Статус',
          value: 'status',
        },
        {
          label: 'Просмотры',
          value: 'statistics',
        },
        {
          label: 'Комментарии',
          value: 'comments',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        label: item.label.slice(0, 64),
        status: (
          <Chip
            size={'small'}
            label={item.status === 'REJECTED' ? 'Отклонен' : item.status === 'PENDING' ? 'Ожидание' : 'Завершен'}
          />
        ),
        statistics: <IconCount autoHide icon={ViewsIcon} count={item.statistics} />,
        comments: <IconCount autoHide icon={CommentsIcon} count={item.comments} />,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default FaqTable
