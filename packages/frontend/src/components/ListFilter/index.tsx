import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import FilterIcon from '@mui/icons-material/FilterList'

import { useState } from 'react'

interface ListFilterProps {
  showBadge?: boolean
  children?: React.ReactNode
  content?: React.ReactNode
  onReset?: Callback
  onSubmit?: Callback
}

const ListFilter = (props: ListFilterProps) => {
  const { showBadge, content, children, onReset, onSubmit } = props

  const [openFilters, setOpenFilters] = useState(false)

  return (
    <Stack>
      {/* Buttons */}
      <Stack py={0.75} direction={'row'} spacing={1} alignItems={'center'}>
        {/* Show filters button */}
        <IconButton size={'small'} onClick={() => setOpenFilters((state) => !state)}>
          <Badge
            showZero={showBadge}
            color={'secondary'}
            variant={'dot'}
            badgeContent={0}
            sx={{
              '& .MuiBadge-badge': { right: 2, top: 5, width: 14, height: 14, border: '3px solid white' },
            }}>
            <FilterIcon />
          </Badge>
        </IconButton>
        {/* Additional content */}
        <Stack width={'100%'} direction={'row'} spacing={1} alignItems={'center'} justifyContent={'space-between'}>
          {!!content && content}
        </Stack>
      </Stack>
      {/* Filters */}
      <Collapse in={openFilters} unmountOnExit>
        <Stack py={0.75} spacing={1}>
          {!!children && children}
          <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
            <Button onClick={onReset}>Сбросить</Button>
            <Button onClick={onSubmit}>Применить</Button>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default ListFilter
