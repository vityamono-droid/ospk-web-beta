import TableContainer from '@mui/material/TableContainer'
import TableBase from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const TableHeadCell = (props: TableCellProps) => {
  return <TableCell {...props} sx={{ bgcolor: '#e0e0e0', height: 48, py: 0 }} />
}

const TableBodyCell = (props: TableCellProps) => {
  return <TableCell {...props} sx={{ height: 48, py: 0 }} />
}

interface TableHeadItem {
  name: string
  title: string
  align?: TableCellProps['align']
}

interface TableProps<T = any> {
  caption?: string
  header: TableHeadItem[]
  data?: T[]
  page: number
  isLoading?: boolean
  onPageChange: (page: number) => void
  onItemClick?: (item: T) => void
}

const Table = ({ caption, header, data, page, isLoading, onPageChange, onItemClick }: TableProps) => {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {isLoading && (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={64} />
        </Box>
      )}
      {!isLoading && (
        <>
          <TableContainer sx={{ maxHeight: '100%', border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <TableBase stickyHeader>
              {!!caption && caption}
              <TableHead>
                <TableRow key={crypto.randomUUID()}>
                  {header.map((item) => (
                    <TableHeadCell key={crypto.randomUUID()} align={item.align}>
                      {item.title}
                    </TableHeadCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!!data &&
                  data.map((item) => (
                    <TableRow
                      key={crypto.randomUUID()}
                      sx={{ cursor: !!onItemClick ? 'pointer' : 'initial' }}
                      onClick={() => !!onItemClick && onItemClick(item)}>
                      {header.map((cell) => (
                        <TableBodyCell key={crypto.randomUUID()} align={cell.align}>
                          {item[cell.name]}
                        </TableBodyCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </TableBase>
          </TableContainer>
          <TablePagination
            component={'div'}
            count={-1}
            page={page}
            rowsPerPage={50}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, page }) => `Страница ${page + 1} (${from}-${to})`}
            onPageChange={(_, page) => onPageChange(page)}
          />
        </>
      )}
    </Box>
  )
}

export default Table
