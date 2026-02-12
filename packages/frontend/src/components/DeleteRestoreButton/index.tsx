import Button from '@mui/material/Button'

import DeleteIcon from '@mui/icons-material/Delete'
import RestoreIcon from '@mui/icons-material/RestoreFromTrash'

interface DeleteRestoreButtonProps {
  removed?: boolean
  onClick?: Callback
}

const DeleteRestoreButton = ({ removed, onClick }: DeleteRestoreButtonProps) => {
  return (
    <Button
      disableElevation
      variant={'contained'}
      sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      onClick={() => !!onClick && onClick()}>
      {removed ? <RestoreIcon /> : <DeleteIcon />}
    </Button>
  )
}

export default DeleteRestoreButton
