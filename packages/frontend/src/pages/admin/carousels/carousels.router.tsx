import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const CarouselListPage = lazy(() => import('./carouselList'))

const CarouselsRouter = () => {

  return (
    <>
      <Routes>
        <Route index element={<CarouselListPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default CarouselsRouter
