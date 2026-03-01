import { Outlet } from 'react-router'
import NavTabs from '@components/NavTabs'

const TabbedLayout = ({ tabs }: { tabs: LabelValue[] }) => {
  return (
    <>
      <NavTabs tabs={tabs} />
      <Outlet />
    </>
  )
}

export default TabbedLayout
