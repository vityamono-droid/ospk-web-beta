import AtomIcon from '@mui/icons-material/AllInbox'
import IconButton from '@mui/material/IconButton'

const AtomButton = ({ onClick }: { onClick?: Callback }) => {
  return (
    <IconButton size={'small'} onClick={onClick}>
      <AtomIcon />
    </IconButton>
  )
}

export default AtomButton
