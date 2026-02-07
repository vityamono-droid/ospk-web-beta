import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import sleep from '@utils/sleep.util'

const catalog1Id = crypto.randomUUID()
const catalog2Id = crypto.randomUUID()

const category1Id = crypto.randomUUID()
const category2Id = crypto.randomUUID()
const category3Id = crypto.randomUUID()
const category4Id = crypto.randomUUID()
const category5Id = crypto.randomUUID()

const fakeCatalogs = [
  {
    id: catalog1Id,
    label: 'Covid-19',
    banner: 'https://picsum.photos/200/450',
    description: 'Test description',
    disabled: false,
  },
  {
    id: catalog2Id,
    label: 'Test',
    banner: 'https://picsum.photos/200/450',
    disabled: true,
  },
]

const fakeCategories = [
  {
    id: category1Id,
    label: 'Все',
    disabled: false,
  },
  {
    id: category2Id,
    label: 'Коронавирус',
    disabled: false,
  },
  {
    id: category3Id,
    parentId: category2Id,
    label: 'Масочный режим',
    disabled: false,
  },
  {
    id: category4Id,
    parentId: category2Id,
    label: 'Сдача крови',
    disabled: false,
  },
  {
    id: category5Id,
    parentId: category4Id,
    label: 'От руководства',
    disabled: true,
  },
]

const fakeArticle = [
  {
    id: crypto.randomUUID(),
    label: 'Test article 1',
    disabled: false,
    content: '<p>Hui sosat</p>',
    banner: 'https://picsum.photos/200',
    createdAt: `${new Date().toJSON()}`,
    catalogId: catalog1Id,
    categoryId: category1Id,
  },
  {
    id: crypto.randomUUID(),
    label: 'Test article 2',
    content: '<p>Hui sosat</p>',
    banner: 'https://picsum.photos/200',
    disabled: false,
    createdAt: `${new Date().toJSON()}`,
    catalogId: catalog1Id,
    categoryId: category2Id,
  },
  {
    id: crypto.randomUUID(),
    label: 'Test article 3',
    content: '<p>Hui sosat</p>',
    banner: 'https://picsum.photos/200',
    disabled: true,
    createdAt: `${new Date().toJSON()}`,
    categoryId: category3Id,
  },
  {
    id: crypto.randomUUID(),
    label: 'Test article 4',
    content: '<p>Hui sosat</p>',
    banner: 'https://picsum.photos/200',
    disabled: true,
    createdAt: `${new Date().toJSON()}`,
    catalogId: catalog2Id,
  },
  {
    id: crypto.randomUUID(),
    label: 'Test article 5',
    content: '<p>Hui sosat</p>',
    banner: 'https://picsum.photos/200',
    disabled: true,
    createdAt: `${new Date().toJSON()}`,
    catalogId: catalog2Id,
  },
]

const newsApi = createApi({
  reducerPath: 'news',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['articles', 'catalogs', 'categories'],
  endpoints: (builder) => ({
    /* Articles */
    listNews: builder.query({
      providesTags: ['articles'],
      queryFn: async () => {
        return await sleep(1000, {
          data: fakeArticle.map((item) => ({
            id: item.id,
            label: item.label,
            disabled: item.disabled,
            createdAt: item.createdAt,
          })),
        })
      },
    }),
    getArticle: builder.query({
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      queryFn: async (id: string) => {
        return await sleep(1000, {
          data: fakeArticle.find((item) => item.id == id),
        })
      },
    }),
    saveArticle: builder.mutation({
      invalidatesTags: ['articles'],
      queryFn: async (data: (typeof fakeArticle)[number]) => {
        fakeArticle.push({
          ...data,
          id: crypto.randomUUID(),
        })

        return await sleep(1000, {
          data: undefined,
        })
      },
    }),
    updateArticle: builder.mutation({
      invalidatesTags: ['articles'],
      queryFn: async (data: (typeof fakeArticle)[number]) => {
        const index = fakeArticle.findIndex((item) => item.id == data.id)
        fakeArticle[index] = data

        return await sleep(1000, {
          data: undefined,
        })
      },
    }),
    deleteArticle: builder.mutation({
      invalidatesTags: ['articles'],
      queryFn: async (id: string) => {
        const index = fakeArticle.findIndex((item) => item.id == id)
        fakeArticle.splice(index, 1)

        return await sleep(1000, {
          data: undefined,
        })
      },
    }),

    /* Catalogs */
    listCatalogs: builder.query({
      providesTags: ['catalogs'],
      queryFn: async () => {
        return await sleep(1000, {
          data: fakeCatalogs.map((item) => ({
            id: item.id,
            label: item.label,
            disabled: item.disabled,
          })),
        })
      },
    }),

    /* Categories */
    listCategories: builder.query({
      providesTags: ['catalogs'],
      queryFn: async () => {
        return await sleep(1000, {
          data: fakeCategories.map((item) => ({
            id: item.id,
            label: item.label,
            disabled: item.disabled,
            parentId: item.parentId,
          })),
        })
      },
    }),
  }),
})

export const {
  /* Articles */
  useListNewsQuery,
  useGetArticleQuery,
  useSaveArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,

  /* Catalogs */
  useListCatalogsQuery,

  /* Categories */
  useListCategoriesQuery,
} = newsApi

export default newsApi
