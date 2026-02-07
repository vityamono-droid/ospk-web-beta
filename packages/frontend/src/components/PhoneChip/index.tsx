import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import formatPhone from '@utils/formatPhone'

interface PhoneChipProps {
  phone?: string
  fullWidth?: boolean
}

const PhoneChip = ({ phone, fullWidth }: PhoneChipProps) => {
  return (
    <Chip
      size={'small'}
      label={<>{!!phone && <Typography variant={'caption'} noWrap>{formatPhone(phone)}</Typography>}</>}
      sx={{ width: fullWidth ? '100%' : 'initial' }}
    />
  )
}

export default PhoneChip
