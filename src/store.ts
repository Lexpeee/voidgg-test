import { 
  configureStore, 
  createSlice
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { postsApi, valorantApi } from '@/services'


/** 
 * States
 */

export const globalInitialState = {
  posts: [],
  leaderboard: {},
  region: 'ap'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: globalInitialState, 
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    }
  }
})

/**
 * Configurations
 */

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [valorantApi.reducerPath]: valorantApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware, valorantApi.middleware)
})

setupListeners(store.dispatch)


export {
  postsApi, 
  valorantApi
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
