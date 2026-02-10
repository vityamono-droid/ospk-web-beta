import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CatalogIcon from '@mui/icons-material/Commit'

import { useClientContext } from '@apps/client.context'

const ArticleSidebar = () => {
  const { articles } = useClientContext()

  const handleClick = (id?: string) => {
    articles.onChange(id)
  }

  return (
    <Paper>
      <Stack pt={1} spacing={1}>
        <ListItem>
          <Typography variant={'h5'} fontWeight={'bold'}>
            Разделы
          </Typography>
        </ListItem>
        <Stack>
          <MenuItem selected={!articles.selected} onClick={() => handleClick()}>
            <ListItemIcon />
            <ListItemText>Все новости</ListItemText>
          </MenuItem>
          {articles.catalogs.map((item, index) => (
            <MenuItem
              key={item.id}
              selected={item.id == articles.selected}
              divider={index != articles.catalogs.length - 1}
              onClick={() => handleClick(item.id)}>
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

export default ArticleSidebar
