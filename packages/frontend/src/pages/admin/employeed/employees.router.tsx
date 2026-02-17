import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const EmployeeListPage = lazy(() => import('./employeeList'))

const EmployeesRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<EmployeeListPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default EmployeesRouter
