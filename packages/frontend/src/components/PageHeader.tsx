import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import BackIcon from '@mui/icons-material/ChevronLeft'

import { useNavigate } from 'react-router'

const PageHeader = ({ title, backTo }: { title: string; backTo?: string }) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ py: 0.9, gap: 1, display: 'flex', alignItems: 'center' }}>
      <IconButton size={'small'} onClick={() => (!!backTo ? navigate(backTo) : navigate(-1))}>
        <BackIcon />
      </IconButton>
      <Typography variant={'h6'} fontWeight={'bold'}>
        {title}
      </Typography>
    </Box>
  )
}

export default PageHeader
