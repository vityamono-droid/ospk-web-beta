import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const ArticleListPage = lazy(() => import('./articleList'))

const NewsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<ArticleListPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default NewsRouter
