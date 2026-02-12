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
  },
  {
    title: 'Заказы',
    icon: <OrdersIcon />,
    link: 'orders',
    preview: true,
  },
  {
    title: 'Обращения',
    icon: <RequestsIcon />,
    link: 'requests',
    preview: true,
    underline: true,
  },
  {
    title: 'Персонал',
    icon: <EmployeesIcon />,
    link: 'employees',
  },
  {
    title: 'Отделения',
    icon: <DepartmentIcon />,
    link: 'departments',
  },
  {
    title: 'Услуги',
    icon: <ServicesIcon />,
    link: 'services',
    underline: true,
  },
  {
    title: 'Новости',
    icon: <NewsIcon />,
    link: 'news',
  },
  {
    title: 'Рассылка',
    icon: <AnnouncesIcon />,
    link: 'announces',
    preview: true,
  },
  {
    title: 'Карусель',
    icon: <CarouselsIcon />,
    link: 'carousels',
    preview: true,
  },
]

export type AdminNavItem = (typeof adminNav)[number]

export default adminNav
