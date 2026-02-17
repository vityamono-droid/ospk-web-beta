import CogIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'

interface CogButtonProps {
  onClick?: Callback
}

const CogButton = ({ onClick }: CogButtonProps) => {
  return (
    <IconButton size={'small'} onClick={onClick}>
      <CogIcon />
    </IconButton>
  )
}

export default CogButton
