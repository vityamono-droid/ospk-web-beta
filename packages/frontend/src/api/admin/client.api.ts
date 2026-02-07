import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import sleep from '@utils/sleep.util'
import { clients } from './mock/clients'

const fakeClients = clients

const clientsApi = createApi({
  reducerPath: 'clients',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['clients'],
  endpoints: (builder) => ({
    /* Clients */
    listClients: builder.mutation({
      queryFn: async ({ limit, offset }: { limit: number, offset: number }) => {
        return await sleep(1000, {
          data: fakeClients.slice(offset, offset + limit),
        })
      },
    }),
    getClient: builder.query({
      queryFn: async (id: string) => {
        return await sleep(1000, {
          data: fakeClients.find(item => item.id == id)
        })
      }
    }),
  }),
})

export const { useListClientsMutation, useGetClientQuery } = clientsApi

export default clientsApi
