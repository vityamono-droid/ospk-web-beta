import { StrictMode, Suspense } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router'

import AppIcon from '@assets/ospk-logo.svg'
import Loading from '@components/Loading'
import AppRouter from '@pages/app.router'

import { createRoot } from 'react-dom/client'

import appTheme from '@themes'

const root = document.getElementById('root')
if (!root) {
  throw new Error('#root element is not defined')
}

createRoot(root).render(
  <StrictMode>
    <link rel={'icon'} type={'image/x-icon'} href={AppIcon} />
    <ThemeProvider theme={appTheme} noSsr>
      <CssBaseline />
      <SnackbarProvider>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
)
