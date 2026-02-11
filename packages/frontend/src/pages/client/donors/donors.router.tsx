import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const IndexPage = lazy(() => import('./indexPage'))

const DonorsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<IndexPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default DonorsRouter
