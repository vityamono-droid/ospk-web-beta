import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import FilterIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'

const ListFilter = ({ children, additional }: { children?: any, additional?: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: 48, gap: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setOpen((state) => !state)}>
            <Badge
              color={'secondary'}
              badgeContent={' '}
              variant={'dot'}
              sx={{
                '& .MuiBadge-badge': { right: 2, top: 5, width: 14, height: 14, border: '3px solid white' },
              }}>
              <FilterIcon />
            </Badge>
          </IconButton>
          {!!additional && additional}
        </Box>
        <Collapse in={open} unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {!!children && children}
            <Box sx={{ height: 48, display: 'flex', alignItems: 'center' }}>
              <Button>Сбросить</Button>
              <Button variant={'outlined'}>Применить</Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  )
}

export default ListFilter
