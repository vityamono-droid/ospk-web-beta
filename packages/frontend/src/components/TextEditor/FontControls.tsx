import Box from '@mui/material/Box'
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonStrikethrough,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuDivider,
  MenuSelectFontSize,
  MenuSelectHeading,
} from 'mui-tiptap'
import ControlsGroup from './ControlsGroup'

const FontGroup = () => {
  return (
    <ControlsGroup title={'Текст'}>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuSelectHeading />
          <MenuSelectFontSize />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuButtonBold />
          <MenuButtonItalic />
          <MenuButtonUnderline />
          <MenuButtonStrikethrough />
          <MenuDivider />
          <MenuButtonTextColor />
        </Box>
      </>
    </ControlsGroup>
  )
}

export default FontGroup
