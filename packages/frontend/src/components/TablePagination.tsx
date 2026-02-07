import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import PrevIcon from '@mui/icons-material/ChevronLeft'
import NextIcon from '@mui/icons-material/ChevronRight'

interface TablePaginationProps {
  limit: number
  offset: number
  count: number
  loading?: boolean
  onChange?: (offset: number) => void
}

const TablePagination = ({ limit, offset, count, loading, onChange }: TablePaginationProps) => {
  const handleChange = (direction: number) => () => {
    !!onChange && onChange(offset + limit * direction)
  }

  return (
    <Box sx={{ ml: 'auto', gap: 1, display: 'flex', alignItems: 'center' }}>
      <IconButton size={'small'} disabled={loading || offset == 0} onClick={handleChange(-1)}>
        <PrevIcon />
      </IconButton>
      <Typography>
        {offset + 1} –{' '}
        {loading ? <CircularProgress size={12} /> : count == 0 ? offset + 1 : limit > count ? offset + count : offset + limit}{' '}
        {loading ? (
          ''
        ) : (
          `из ${count == 0 ? offset + 1 : limit > count ? offset + count : offset + limit}${limit == count ? '+' : ''}`
        )}
      </Typography>
      <IconButton size={'small'} disabled={loading || limit > count} onClick={handleChange(1)}>
        <NextIcon />
      </IconButton>
    </Box>
  )
}

export default TablePagination
