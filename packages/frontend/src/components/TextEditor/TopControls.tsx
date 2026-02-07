import { MenuButtonRedo, MenuButtonUndo, MenuDivider } from 'mui-tiptap'
import Box from '@mui/material/Box'

const UndoRedoControls = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <MenuButtonUndo />
      <MenuButtonRedo />
    </Box>
  )
}

const TopControls = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <UndoRedoControls />
      <MenuDivider />
    </Box>
  )
}

export default TopControls
