import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import CatalogIcon from '@mui/icons-material/Commit'

import { useClientContext } from '@apps/client.context'

const ServiceSidebar = () => {
  const { services: { catalogs, selected, onChange } } = useClientContext()

  return (
    <Paper>
      <Stack pt={1} spacing={1}>
        <ListItem>
          <Typography variant={'h5'} fontWeight={'bold'}>
            Разделы
          </Typography>
        </ListItem>
        <Stack>
          {catalogs.map((item, index) => (
            <MenuItem divider={index != catalogs.length - 1} key={item.id} selected={item.id == selected} onClick={() => onChange(item.id)}>
              <ListItemIcon>
                <CatalogIcon />
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default ServiceSidebar
