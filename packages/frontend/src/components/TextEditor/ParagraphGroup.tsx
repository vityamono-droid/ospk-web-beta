import Box from '@mui/material/Box'
import ControlsGroup from './ControlsGroup'
import {
  MenuButtonAlignCenter,
  MenuButtonAlignJustify,
  MenuButtonAlignLeft,
  MenuButtonAlignRight,
  MenuButtonBulletedList,
  MenuButtonIndent,
  MenuButtonOrderedList,
  MenuButtonUnindent,
} from 'mui-tiptap'

const ParagraphGroup = () => {
  return (
    <ControlsGroup title={'Параграф'}>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuButtonBulletedList />
          <MenuButtonOrderedList />
          <MenuButtonIndent />
          <MenuButtonUnindent />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuButtonAlignLeft tooltipLabel='По левому краю' />
          <MenuButtonAlignCenter tooltipLabel='По центру' />
          <MenuButtonAlignRight tooltipLabel='По правому краю' />
          <MenuButtonAlignJustify tooltipLabel='Равномерно' />
        </Box>
      </>
    </ControlsGroup>
  )
}

export default ParagraphGroup
