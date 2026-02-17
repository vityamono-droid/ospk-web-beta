import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import { Provider as ApiProvider } from 'react-redux'
import AuthLayout from './auth.layout'
import FormLayout from './form.layout'

import commonStore from '@api/common'

const LoginPage = lazy(() => import('./login.page'))
const RegisterPage = lazy(() => import('./register.page'))
const CallbackPage = lazy(() => import('./callback.page'))

const AuthRouter = () => {
  return (
    <ApiProvider store={commonStore}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<FormLayout />}>
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
          </Route>
          <Route path={'/callback'} element={<CallbackPage />} />
        </Route>
      </Routes>
      <Outlet />
    </ApiProvider>
  )
}

export default AuthRouter
