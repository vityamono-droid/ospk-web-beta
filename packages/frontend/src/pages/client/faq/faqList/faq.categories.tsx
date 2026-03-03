import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CatalogIcon from '@mui/icons-material/Commit'

import type { CategoryData } from '@ospk/web-models/requests'

interface FaqPageProps {
  data: CategoryData[]
  selected?: string
  onChange?: ValueCallback<string>
}

const FaqCategories = ({ data, selected, onChange }: FaqPageProps) => {
  return (
    <Paper>
      <Stack pt={1} spacing={1}>
        <ListItem>
          <Typography variant={'h5'} fontWeight={'bold'}>
            Разделы
          </Typography>
        </ListItem>
        <Stack>
          {data.map((item, index) => (
            <MenuItem
              divider={index != data.length - 1}
              key={item.id}
              selected={item.id == selected}
              onClick={() => !!onChange && onChange(item.id)}>
              <ListItemIcon>
                <CatalogIcon />
              </ListItemIcon>
              <ListItemText sx={{ whiteSpace: 'wrap' }}>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default FaqCategories
