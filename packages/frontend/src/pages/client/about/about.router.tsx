import StaticContent from '@components/StaticContent'
import { Outlet, Route, Routes } from 'react-router'

const AboutRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<StaticContent title={'Реквизиты'} file={'/requisits.html'} />} />
        <Route
          path={'planning'}
          element={<StaticContent title={'План мероприятий'} file={'/Донорам - План мероприятий.html'} />}
        />
      </Routes>
      <Outlet />
    </>
  )
}

export default AboutRouter
