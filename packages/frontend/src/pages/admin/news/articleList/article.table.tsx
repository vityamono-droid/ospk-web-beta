import DataGrid from '@components/DataGrid'
import IconCount from '@components/IconCount'
import RemovedDisabled from '@components/RemovedDisabled'
import type { Article } from '@ospk/web-models/articles'
import CommentsIcon from '@mui/icons-material/Try'
import ViewsIcon from '@mui/icons-material/Visibility'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

interface ArticleTableProps {
  data: Article[]
  onRowClick?: ValueCallback<string>
}

const ArticleTable = ({ data, onRowClick }: ArticleTableProps) => {
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
          align: 'right',
          label: 'Статистика',
          value: 'commentsViews',
        },
        {
          align: 'right',
          label: 'Дата публикации',
          value: 'createdAt',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
        commentsViews: (
          <Stack direction={'row'} spacing={2} justifyContent={'right'}>
            <IconCount autoHide icon={CommentsIcon} count={item.comments} />
            <IconCount autoHide icon={ViewsIcon} count={item.statics} />
          </Stack>
        ),
        createdAt: <Chip size={'small'} label={new Date(item.createdAt).toLocaleDateString()} />,
      }))}
      onRowClick={onRowClick}
    />
  )
}

export default ArticleTable
