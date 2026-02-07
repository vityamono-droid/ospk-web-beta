import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { JSX } from 'react'

const ControlsGroup = ({ title, children }: { title: string; children: JSX.Element }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {children}
      <Typography variant={'caption'} textAlign={'center'} sx={{ mt: 1 }}>
        {title}
      </Typography>
    </Box>
  )
}

export default ControlsGroup
