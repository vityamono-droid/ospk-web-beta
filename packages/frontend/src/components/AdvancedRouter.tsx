import type { JSX } from 'react'
import { Outlet, Route, Routes, type RouteProps } from 'react-router'

type AdvancedRouteProps = RouteProps & {
  outside?: boolean
}

export const AdvancedRoute = ({ outside, ...props }: AdvancedRouteProps) => {
  return <Route {...props} />
}

interface AdvancedRouterProps {
  layout?: JSX.Element
  children?: ReturnType<(typeof AdvancedRoute)>[]
}

const AdvancedRouter = ({ layout, children }: AdvancedRouterProps) => {
  const outsideRoutes = children?.filter((item) => item.outside)
  const insideRoutes = children?.filter((item) => !item.outside)

  return (
    <>
      <Routes>
        {!!children && (
          <>
            {!!layout ? (
              <>
                <Route element={layout}>
                  {insideRoutes?.map((item) => (
                    <Route {...item} />
                  ))}
                </Route>
                {outsideRoutes?.map((item) => (
                  <Route {...item} />
                ))}
              </>
            ) : (
              <>
                {children.map((item) => (
                  <Route {...item} />
                ))}
              </>
            )}
          </>
        )}
      </Routes>
      <Outlet />
    </>
  )
}

export default AdvancedRouter
