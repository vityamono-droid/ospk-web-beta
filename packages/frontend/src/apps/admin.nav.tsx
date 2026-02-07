import DashboardIcon from '@mui/icons-material/Dashboard'
import ClientIcon from '@mui/icons-material/Person'
import AnnouncesIcon from '@mui/icons-material/Notifications'
import EmployeesIcon from '@mui/icons-material/Badge'
import DepartmentIcon from '@mui/icons-material/Apartment'
import ServicesIcon from '@mui/icons-material/Storefront'
import OrdersIcon from '@mui/icons-material/ShoppingCart'
import CarouselsIcon from '@mui/icons-material/ViewCarousel'
import NewsIcon from '@mui/icons-material/Newspaper'
import RequestsIcon from '@mui/icons-material/Label'

const adminNav = [
  {
    title: 'Главная',
    icon: <DashboardIcon />,
    link: '/',
    underline: true,
  },
  {
    title: 'Клиенты',
    icon: <ClientIcon />,
    link: 'clients',
  },
  {
    title: 'Заказы',
    icon: <OrdersIcon />,
    link: 'orders',
  },
  {
    title: 'Запросы',
    icon: <RequestsIcon />,
    link: 'requests',
    underline: true,
  },
  {
    title: 'Сотрудники',
    icon: <EmployeesIcon />,
    link: 'employees',
  },
  {
    title: 'Отделения',
    icon: <DepartmentIcon />,
    link: 'departments',
    underline: true,
  },
  {
    title: 'Каталог',
    icon: <ServicesIcon />,
    link: 'services',
  },
  {
    title: 'Новости',
    icon: <NewsIcon />,
    link: 'news',
  },
]

export type AdminNavItem = (typeof adminNav)[number]

export default adminNav
