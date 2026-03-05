import { Outlet, Route, Routes } from 'react-router'

import StaticContent from '@components/StaticContent'

const DonorsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<StaticContent title={'Прием доноров'} file={'donors.html'} />} />
        <Route
          path={'recommendations'}
          element={<StaticContent title={'Рекомендации донорам'} file={'recommendations.html'} />}
        />
        <Route
          path={'howto'}
          element={<StaticContent title={'Как стать донором'} file={'донорам - Как стать донорам.html'} />}
        />
      </Routes>
      <Outlet />
    </>
  )
}

export default DonorsRouter
