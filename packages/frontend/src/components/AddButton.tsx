import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import PlusIcon from '@mui/icons-material/Add'

interface AddButtonProps extends Omit<ButtonProps, 'onClick'> {
  label?: string
  title?: string
  onClick?: Callback
}

const AddButton = ({ label, onClick, ...props }: AddButtonProps) => {
  return (
    <Button {...props} startIcon={<PlusIcon />} onClick={() => !!onClick && onClick()}>
      {label ?? 'Добавить'}
    </Button>
  )
}

export default AddButton
