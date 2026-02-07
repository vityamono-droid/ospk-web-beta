import Chip from '@mui/material/Chip'

interface IsDisabledChipProps {
  disabled?: boolean
  fullWidth?: boolean
}

const IsDisabledChip = ({ disabled, fullWidth }: IsDisabledChipProps) => {
  return (
    <Chip
      size={'small'}
      variant={'outlined'}
      color={disabled ? 'warning' : 'success'}
      label={disabled ? 'Отключено' : 'Включено'}
      sx={{ width: fullWidth ? '100%' : 'initial' }}
    />
  )
}

export default IsDisabledChip
