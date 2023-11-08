import {
  createApi, 
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const valorantApi = createApi({
  reducerPath: 'valorantApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.henrikdev.xyz/valorant/",
  }),
  endpoints: (builder) => ({
    getLeaderboard: builder.query<any, any>({
      query: (affinity) => `/v2/leaderboard/${affinity}`
    }),
    getPlayerMatches: builder.query<any, any>({
      query: (values) => `/v3/matches/ap/${values?.name}/${values?.tag}`
    }),
    getPlayerAccount: builder.query<any, any>({
      query: (values) => `/v1/account/${values?.name}/${values?.tag}`
    })
  })
})