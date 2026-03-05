import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AuthProvider from '@pages/auth/auth.context'
import ClientLayout from './_layout/client.layout'

const GosuslugiRouter = lazy(() => import('./gosuslugi/gosuslugi.router'))
const NewsRouter = lazy(() => import('./news/news.router'))
const IndexPage = lazy(() => import('./indexPage'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const DonorsRouter = lazy(() => import('./donors/donors.router'))
const FaqRouter = lazy(() => import('./faq/faq.router'))
const ContactsPage = lazy(() => import('./contacts/contacts.page'))
const AboutRouter = lazy(() => import('./about/about.router'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))

const ClientRouter = () => {
  return (
    <AuthProvider on401={'none'}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'gosuslugi/*'} element={<GosuslugiRouter />} />
          <Route path={'news/*'} element={<NewsRouter />} />
          <Route path={'services/*'} element={<ServicesRouter />} />
          <Route path={'donors/*'} element={<DonorsRouter />} />
          <Route path={'about/*'} element={<AboutRouter />} />
          <Route path={'contacts/*'} element={<ContactsPage />} />
          <Route path={'faq/*'} element={<FaqRouter />} />
        </Route>
        <Route path={'*'} element={<Page404 />} />
      </Routes>
      <Outlet />
    </AuthProvider>
  )
}

export default ClientRouter
