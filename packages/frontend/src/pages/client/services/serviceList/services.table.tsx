import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import type { ServiceCategoryNav } from '@ospk/web-models/services'
import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'

interface ServiceTableProps {
  data: ServiceCategoryNav
}

const ServiceTable = ({ data }: ServiceTableProps) => {
  const handleLink = () => {
    navigator.clipboard.writeText(`${location.origin}${location.pathname}#${data.id}`)
  }

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography id={data.id} variant={'h5'} fontWeight={'bold'}>
          {data.label}
        </Typography>
        <IconButton size={'small'} onClick={handleLink}>
          <LinkIcon />
        </IconButton>
      </Stack>
      {!!data.description && <Typography>{data.description}</Typography>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell sx={{ width: '50%', borderRight: '1px solid #bbb' }}>Название</TableCell>
              <TableCell align={'center'} sx={{ width: '25%', borderRight: '1px solid #bbb' }} />
              <TableCell sx={{ width: '25%' }}>Цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.services?.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ borderRight: '1px solid #eee' }}>{item.label}</TableCell>
                <TableCell align={'center'} sx={{ borderRight: '1px solid #eee' }}>
                  {item.forLegals && <Chip size={'small'} variant={'outlined'} label={'Для юр. лиц'} />}
                </TableCell>
                <TableCell>
                  {item.price} {item.amountType === 'FINITE' && !!item.unit && `за ${item.unit}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default ServiceTable
