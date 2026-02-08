import { createContext, useContext, useEffect, useState, type JSX } from 'react'
import { useLocation } from 'react-router'

interface AdminContextProps {
  section: string
}

const AdminContext = createContext<AdminContextProps>({
  section: '/',
})

const AdminProvider = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()

  const [section, setSection] = useState('/')

  useEffect(() => {
    const tokens = location.pathname.split('/')
    if (tokens.length == 2 && tokens[1] == 'admin') {
      setSection('/')
      return
    }

    setSection(location.pathname.split('/')[2])
  }, [location.key])

  return <AdminContext value={{ section }}>{children}</AdminContext>
}

export const useAdminContext = () => useContext(AdminContext)

export default AdminProvider
