import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const IndexPage = lazy(() => import('./index.page'))

const CarouselsRouter = () => {

  return (
    <>
      <Routes>
        <Route index element={<IndexPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default CarouselsRouter
