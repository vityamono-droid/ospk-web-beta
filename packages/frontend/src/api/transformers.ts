import type { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import type { ApiResponse } from '@ospk/web-models'

import { enqueueSnackbar } from 'notistack'

interface TransformOptions {
  defaultValue?: any
  successMessage?: string
}

export const transformResponse =
  ({ defaultValue, successMessage }: TransformOptions) =>
  async (response: ApiResponse, _meta: FetchBaseQueryMeta | undefined, _arg: any) => {
    if (response.error) {
      response.message &&
        enqueueSnackbar(response.message, {
          variant: 'warning',
          autoHideDuration: 5000,
        })
    } else {
      successMessage &&
        enqueueSnackbar(successMessage, {
          variant: 'success',
          autoHideDuration: 2000,
        })
    }

    return response.data ?? defaultValue
  }

export const transformErrorResponse = (defaultValue?: any) => async (
  response: FetchBaseQueryError,
  _meta: FetchBaseQueryMeta | undefined,
  _arg: any,
) => {
  let message
  if (
    !!response.data &&
    typeof response.data === 'object' &&
    'message' in response.data &&
    typeof response.data.message === 'string'
  ) {
    message = response.data.message
  }

  message = 'Произошла неизвестная ошибка'

  enqueueSnackbar(message, {
    variant: 'error',
    autoHideDuration: 5000,
  })

  return defaultValue
}
