import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MuiModal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface ModalProps {
  title: string
  open: boolean
  children?: any
  onClose: () => void
}

const Modal = ({ title, open, children, onClose }: ModalProps) => {

  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Paper>
          <Box sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant={'h5'}>{title}</Typography>
            <Divider sx={{ mx: -2 }} />
            {!!children && children}
          </Box>
        </Paper>
      </Box>
    </MuiModal>
  )
}

export default Modal
