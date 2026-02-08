import IconButton from '@mui/material/IconButton'

import RefreshIcon from '@mui/icons-material/Refresh'

interface RefreshButtonProps {
  loading?: boolean
  disabled?: boolean
  onClick?: Callback
}

const RefreshButton = ({ loading, disabled, onClick }: RefreshButtonProps) => {
  return (
    <IconButton size={'small'} loading={loading} disabled={disabled} onClick={onClick}>
      <RefreshIcon />
    </IconButton>
  )
}

export default RefreshButton
