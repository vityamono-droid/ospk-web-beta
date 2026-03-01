import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

const NavTabs = ({ tabs }: { tabs: LabelValue[] }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [value, setValue] = useState(location.pathname)

  useEffect(() => {
    const path = location.pathname
    setValue(path.endsWith('/') ? path.slice(0, path.length - 1) : path)
  }, [location.key])

  const handleChange = (event: React.SyntheticEvent, value: any) => {
    event.preventDefault()
    event.stopPropagation()
    navigate(value)
  }

  return (
    <Box sx={{ mx: -2, px: 2, boxShadow: '0 -1px 0 #eeeeff inset' }}>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map((item) => (
          <Tab key={item.value} label={item.label} value={item.value} />
        ))}
      </Tabs>
    </Box>
  )
}

export default NavTabs
