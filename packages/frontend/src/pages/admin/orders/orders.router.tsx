import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

import { useAuthContext } from '@pages/auth/auth.context'

const OrderListPage = lazy(() => import('./orderList'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))

const OrdersRouter = () => {
  const { account } = useAuthContext()

  return (
    <>
      <Routes>
        {['admin', 'picker'].some((item) => account?.roles.includes(item)) ? (
          <Route index element={<OrderListPage />} />
        ) : (
          <Route index element={<Page404 />} />
        )}
      </Routes>
      <Outlet />
    </>
  )
}

export default OrdersRouter
