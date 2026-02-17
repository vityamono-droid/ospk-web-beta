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
    title: 'Пользователи',
    icon: <ClientIcon />,
    link: 'clients',
    roles: ['admin'],
  },
  {
    title: 'Заказы',
    icon: <OrdersIcon />,
    link: 'orders',
    preview: true,
    roles: ['admin', 'picker'],
  },
  {
    title: 'Обращения',
    icon: <RequestsIcon />,
    link: 'requests',
    preview: true,
    underline: true,
    roles: ['admin', 'moder'],
  },
  {
    title: 'Персонал',
    icon: <EmployeesIcon />,
    link: 'employees',
    roles: ['admin', 'hr'],
  },
  {
    title: 'Отделения',
    icon: <DepartmentIcon />,
    link: 'departments',
    roles: ['admin', 'hr'],
  },
  {
    title: 'Услуги',
    icon: <ServicesIcon />,
    link: 'services',
    underline: true,
    roles: ['admin', 'moder'],
  },
  {
    title: 'Новости',
    icon: <NewsIcon />,
    link: 'news',
    roles: ['admin', 'moder'],
  },
  {
    title: 'Рассылка',
    icon: <AnnouncesIcon />,
    link: 'announces',
    preview: true,
    roles: ['admin', 'moder'],
  },
  {
    title: 'Карусель',
    icon: <CarouselsIcon />,
    link: 'carousels',
    roles: ['admin', 'moder'],
  },
]

export type AdminNavItem = (typeof adminNav)[number]

export default adminNav
