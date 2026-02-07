import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import NewsLayout from './news.layout'

// News
const NewsPage = lazy(() => import('./articles/news.page'))
const AddEditPage = lazy(() => import('./articles/addEdit.page'))
// Catalogs
const CatalogsPage = lazy(() => import('./catalogs/catalogs.page'))

// Categories
const CategoriesPage = lazy(() => import('./categories/categories.page'))

const NewsRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<NewsLayout />}>
          <Route index element={<NewsPage />} />
          <Route path={'/catalogs'} element={<CatalogsPage />} />
          <Route path={'/categories'} element={<CategoriesPage />} />
        </Route>
        <Route path='/add' element={<AddEditPage />} />
        <Route path='/:id/edit' element={<AddEditPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default NewsRouter
