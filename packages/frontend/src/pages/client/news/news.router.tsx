import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import NewsLayout from './news.layout'

const ArticleListPage = lazy(() => import('./articleList'))
const ArticlePage = lazy(() => import('./articlePage'))

const NewsRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<NewsLayout />}>
          <Route path={'/:id'} element={<ArticlePage />} />
        </Route>
        <Route index element={<ArticleListPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default NewsRouter
