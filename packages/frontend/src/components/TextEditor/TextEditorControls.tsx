import Box from '@mui/material/Box'
import {
  MenuButtonAddImage,
  MenuButtonBlockquote,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHorizontalRule,
  MenuControlsContainer,
  MenuDivider,
} from 'mui-tiptap'
import TopControls from './TopControls'
import FontGroup from './FontControls'
import ParagraphGroup from './ParagraphGroup'
import TableGroup from './TableGroup'

const TextEditorControls = () => {
  return (
    <MenuControlsContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TopControls />
        <Box sx={{ display: 'flex' }}>
          <FontGroup />
          <MenuDivider sx={{ height: 56 }} />
          <ParagraphGroup />
          <MenuDivider sx={{ height: 56 }} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MenuButtonBlockquote />
              <MenuButtonCode />
              <MenuButtonCodeBlock />
              <MenuButtonEditLink />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MenuButtonHorizontalRule />
              <MenuButtonAddImage onClick={() => {}} />
            </Box>
          </Box>
          <MenuDivider sx={{ height: 56 }} />
          <TableGroup />
        </Box>
      </Box>
    </MenuControlsContainer>
  )
}

export default TextEditorControls
