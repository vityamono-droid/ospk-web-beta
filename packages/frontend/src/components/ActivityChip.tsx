import Chip from '@mui/material/Chip'

const ActivityChip = ({ size, disabled }: { size?: 'small' | 'medium'; disabled: boolean }) => {
  return <Chip size={size} variant={'outlined'} label={disabled ? 'Не активен' : 'Активен'} color={disabled ? 'warning' : 'success'} sx={{ width: '100%' }} />
}

export default ActivityChip
