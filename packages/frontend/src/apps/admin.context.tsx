import { createContext, useContext, useEffect, useState, type JSX } from 'react'
import { useLocation } from 'react-router'
import adminNav from './admin.nav'

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
    if (section == '/') {
      document.title = '[Админ] Главная'
      return
    }

    document.title = `[Админ] ${adminNav.find((item) => item.link == section)?.title}`
  }, [section])

  useEffect(() => {
    const tokens = location.pathname.split('/').filter((item) => !!item)
    if (tokens.length == 1 && tokens[0] == 'admin') {
      section != '/' && setSection('/')
      return
    }

    section != tokens[1] && setSection(tokens[1])
  }, [location.key])

  return <AdminContext value={{ section }}>{children}</AdminContext>
}

export const useAdminContext = () => useContext(AdminContext)

export default AdminProvider
