import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const staticApi = createApi({
  reducerPath: 'static',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getStaticPage: builder.query<string, string, string>({
      queryFn: async (file, _, __) => {
        try {
          const response = await fetch(`/static/html/${file}`)
          if (!response.ok) {
            return {
              data: '',
            }
          }

          return {
            data: await response.text(),
          }
        } catch {
          return {
            data: '',
          }
        }
      },
    }),
  }),
})

export const { useGetStaticPageQuery } = staticApi

export default staticApi
