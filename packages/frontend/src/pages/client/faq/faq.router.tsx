import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import FaqLayout from './faq.layout'

const FaqListPage = lazy(() => import('./faqList'))
const FaqPage = lazy(() => import('./faqPage'))

const FaqRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<FaqListPage />} />
        <Route element={<FaqLayout />}>
          <Route path={':id'} element={<FaqPage />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  )
}

export default FaqRouter
