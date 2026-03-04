import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MuiModal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CloseIcon from '@mui/icons-material/Close'

interface ModalProps {
  title?: React.ReactNode
  open?: boolean
  showClose?: boolean
  children?: React.ReactNode
  onClose?: Callback
}

const Modal = ({ title, open, showClose, children, onClose }: ModalProps) => {
  return (
    <MuiModal open={open ?? false} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '100%', sm: 'initial' },
          height: { xs: '100%', sm: 'initial' },
        }}>
        <Paper sx={{ height: { xs: '100%', sm: 'initial' } }}>
          <Box sx={{ p: 2, gap: 2, minWidth: 400, display: 'flex', flexDirection: 'column' }}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
              {!!title && (typeof title === 'string' ? <Typography variant={'h5'}>{title}</Typography> : <>{title}</>)}
              {showClose && (
                <IconButton size={'small'} onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </Stack>
            <Divider sx={{ mx: -2 }} />
            {!!children && children}
          </Box>
        </Paper>
      </Box>
    </MuiModal>
  )
}

export default Modal
