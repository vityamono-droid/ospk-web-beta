import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const OrderListPage = lazy(() => import('./orderList'))

const OrdersRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<OrderListPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default OrdersRouter
