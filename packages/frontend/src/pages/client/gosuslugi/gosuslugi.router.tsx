import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const VerifyPage = lazy(() => import('./verify'))

const GosuslugiRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<VerifyPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default GosuslugiRouter
