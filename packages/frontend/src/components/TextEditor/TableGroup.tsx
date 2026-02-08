import Box from '@mui/material/Box'
import ControlsGroup from './ControlsGroup'
import { MenuButtonAddTable } from 'mui-tiptap'

const TableGroup = () => {
  return (
    <ControlsGroup title={'Таблица'}>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuButtonAddTable />
        </Box>
      </>
    </ControlsGroup>
  )
}

export default TableGroup
