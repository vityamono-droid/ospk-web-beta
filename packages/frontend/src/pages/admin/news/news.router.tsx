import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import NewsLayout from './news.layout'

const ArticleListPage = lazy(() => import('./articleList'))
const ArticlePage = lazy(() => import('./articlePage'))
const CatalogListPage = lazy(() => import('./catalogList'))
const CategoryListPage = lazy(() => import('./categoryList'))

const NewsRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<NewsLayout />}>
          <Route index element={<ArticleListPage />} />
          <Route path={'/catalogs'} element={<CatalogListPage />} />
          <Route path={'/categories'} element={<CategoryListPage />} />
        </Route>
        <Route path='/add' element={<ArticlePage />} />
        <Route path='/:id' element={<ArticlePage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default NewsRouter
