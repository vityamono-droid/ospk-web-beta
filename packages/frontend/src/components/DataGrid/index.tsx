import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import RowSelector from './RowSelector'

interface DataGridHead {
  key?: string
  label?: string
  value: string
  align?: TableCellProps['align']
}

interface DataGridBody {
  id: string
  [key: string]: any
}

interface DataGridProps {
  head: DataGridHead[]
  body: DataGridBody[]
  selected?: string[]
  onSelect?: (value: string[]) => void
  onRowClick?: (value: string) => void
}

const DataGrid = ({ head, body, selected, onSelect, onRowClick }: DataGridProps) => {
  const page = body.map((item) => item.id)

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {!!selected && !!onSelect && (
              <TableCell sx={{ p: 0.5 }}>
                <RowSelector variant={'head'} value={page} selected={selected} onSelect={onSelect} />
              </TableCell>
            )}
            {head.map((item) => (
              <TableCell key={item.key ?? item.value} align={item.align} sx={{ p: 0.5 }}>
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((item) => (
            <TableRow
              key={item.id}
              sx={{ cursor: !!onRowClick ? 'pointer' : 'initial' }}
              onClick={() => !!onRowClick && onRowClick(item.id)}>
              {!!selected && !!onSelect && (
                <TableCell sx={{ p: 0.5 }}>
                  <RowSelector variant={'body'} value={item.id} selected={selected} onSelect={onSelect} />
                </TableCell>
              )}
              {head.map((cell) => (
                <TableCell key={cell.key} align={cell.align} sx={{ p: 0.5 }}>
                  {item[cell.value]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataGrid
