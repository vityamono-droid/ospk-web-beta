import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface FullNameCellProps {
  fullname: {
    lastName: string
    firstName: string
    patronymic?: string
  }
}

const FullNameCell = ({ fullname }: FullNameCellProps) => {
  return (
    <Box>
      <Typography variant={'body2'}>{fullname.lastName}</Typography>
      <Typography variant={'caption'}>{fullname.firstName} {fullname.patronymic}</Typography>
    </Box>
  )
}

export default FullNameCell
