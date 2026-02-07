import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import PlusIcon from '@mui/icons-material/Add'

const AddButton = ({ title, ...props }: { title: string } & ButtonProps) => {
  return <Button {...props} startIcon={<PlusIcon />}>{title}</Button>
}

export default AddButton
