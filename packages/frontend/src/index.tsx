import { StrictMode, Suspense } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider as ApiProvider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router'

import AppIcon from '@assets/ospk-logo.svg'
import Loading from '@components/Loading'

import { createRoot } from 'react-dom/client'

import commonStore from '@api/common'
import appTheme from '@themes'
import AppRouter from '@pages/app.router'

const root = document.getElementById('root')
if (!root) {
  throw new Error('#root element is not defined')
}

createRoot(root).render(
  <StrictMode>
    <link rel={'icon'} type={'image/x-icon'} href={AppIcon} />
    <ThemeProvider theme={appTheme} noSsr>
      <CssBaseline />
      <ApiProvider store={commonStore}>
        <SnackbarProvider>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </Suspense>
        </SnackbarProvider>
      </ApiProvider>
    </ThemeProvider>
  </StrictMode>,
)
