import { Outlet } from 'react-router'
import NavTabs from '@components/NavTabs'
import Stack from '@mui/material/Stack'

const TabbedLayout = ({ tabs }: { tabs: LabelValue[] }) => {
  return (
    <Stack spacing={2} flex={1}>
      <NavTabs tabs={tabs} />
      <Outlet />
    </Stack>
  )
}

export default TabbedLayout
