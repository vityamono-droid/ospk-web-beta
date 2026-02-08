import RemovedDisabled from '@components/RemovedDisabled'
import TreeView from '@components/TreeView'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { ArticleCategory } from '@ospk/web-models/articles'

interface CategoryTreeProps {
  data: ArticleCategory[]
  onRowClick: ValueCallback<string>
}

const CategoryTree = ({ data, onRowClick }: CategoryTreeProps) => {
  return (
    <TreeView
      data={data}
      label={(row) => (
        <Stack direction={'row'} spacing={1}>
          <RemovedDisabled disabled={row.disabled} removedAt={row.removedAt} />
          <Typography>{row.label}</Typography>
        </Stack>
      )}
      onRowClick={onRowClick}
    />
  )
}

export default CategoryTree
