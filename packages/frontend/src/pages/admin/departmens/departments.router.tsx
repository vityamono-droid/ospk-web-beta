import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const DepartmentListPage = lazy(() => import('./departmentList'))
const DepartmentPage = lazy(() => import('./departmentPage'))

const DepartmentsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<DepartmentListPage />} />
        <Route path={'add'} element={<DepartmentPage />} />
        <Route path={':id'} element={<DepartmentPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default DepartmentsRouter
