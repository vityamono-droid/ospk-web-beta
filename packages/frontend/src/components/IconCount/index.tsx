import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

interface IconCountProps {
  icon: any
  count?: number
  tooltip?: ReactNode
}

const IconCount = ({ count, tooltip, ...props }: IconCountProps) => {
  return (
    <>
      {!!count && count > 0 && (
        <Tooltip title={tooltip}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <props.icon sx={{ color: 'slategray' }} />
            <Typography>{count}</Typography>
          </Stack>
        </Tooltip>
      )}
    </>
  )
}

export default IconCount
