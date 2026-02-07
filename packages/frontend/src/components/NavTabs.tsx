import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

interface NavTabItem {
  label: string
  value: string
}

interface NavTabsProps {
  items: NavTabItem[]
}

const NavTabs = ({ items }: NavTabsProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [value, setValue] = useState(location.pathname)

  useEffect(() => {
    setValue(location.pathname)
  }, [location.key])

  const handleChange = (value: string) => {
    navigate(value)
  }

  return (
    <Tabs value={value} onChange={(_, value) => handleChange(value)}>
      {items.map((item) => (
        <Tab key={item.value} label={item.label} value={item.value} />
      ))}
    </Tabs>
  )
}

export default NavTabs
