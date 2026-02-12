import Box from '@mui/material/Box'
import {
  MenuButtonAddTable,
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
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MenuButtonHorizontalRule />
              <MenuButtonEditLink />
              <MenuButtonAddTable />
            </Box>
          </Box>
        </Box>
      </Box>
    </MenuControlsContainer>
  )
}

export default TextEditorControls
