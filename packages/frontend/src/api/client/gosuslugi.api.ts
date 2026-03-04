import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

const gosuslugiApi = createApi({
  reducerPath: 'gosuslugi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    listRegions: builder.query<RegionData[], any>({
      queryFn: async () => {
        const response = await fetch('https://pos.gosuslugi.ru/inbox-service/regions/all')

        return {
          data: await response.json(),
        }
      },
    }),
  }),
})

export const { useListRegionsQuery } = gosuslugiApi

export default gosuslugiApi
