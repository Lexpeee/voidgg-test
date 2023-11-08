import {
  createApi, 
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'


export const postsApi = createApi({
  reducerPath: 'postsApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6396aee2a68e43e41808fa18.mockapi.io/api",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, any>({
      query: (values) => {
        if (values?.search) {
          return `/posts?search=${values?.search}`
        }
        return `/posts?page=${values?.page}&limit=5&sortBy=createdAt&order=desc`
      }
    }),
    getPostDetails: builder.query<any, any>({
      query: (id) => `/posts/${id}`
    }),
  })
})
