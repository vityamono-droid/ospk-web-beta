import { Link as RouterLink } from 'react-router'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Menu from '@mui/material/Menu'

import ExpandIcon from '@mui/icons-material/MoreHoriz'

import { useRef, useState } from 'react'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'

import type { CategoryItem } from '@ospk/web-models/articles'

interface CategoryBreadcrumbsProps {
  items: CategoryItem[]
  showCategories?: boolean
}

const CategoryBreadcrumbs = ({ items, showCategories }: CategoryBreadcrumbsProps) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleOpen = (event: any) => {
    event.stopPropagation()
    setOpen(true)
  }

  const handleClose = (event: any) => {
    event.stopPropagation()
    setOpen(false)
  }

  return (
    <>
      {items.length > 0 && showCategories && (
        <>
          <Menu anchorEl={ref.current} open={open} onClose={handleClose}>
            {items.slice(1, items.length - 1).map((item) => (
              <MenuItem>
                <Link component={RouterLink} to={`/news`} color={'textDisabled'}>
                  {item.label}
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <Breadcrumbs>
            <Link component={RouterLink} to={`/news`} color={'textDisabled'}>
              {items[0].label}
            </Link>
            {items.length > 1 && (
              <IconButton size={'small'} ref={ref} onClick={handleOpen}>
                <ExpandIcon />
              </IconButton>
            )}
            {items.length > 1 && (
              <Link component={RouterLink} to={`/news`} color={'textDisabled'}>
                {items[items.length - 1].label}
              </Link>
            )}
          </Breadcrumbs>
          <Stack>
            <Divider orientation={'vertical'} />
          </Stack>
        </>
      )}
    </>
  )
}

export default CategoryBreadcrumbs
