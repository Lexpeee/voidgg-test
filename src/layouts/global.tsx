import { postsApi, valorantApi } from '@/services'
import { globalSlice } from '@/store'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type GlobalLayoutProps = {
  children: any
}

const GlobalLayout:FC<GlobalLayoutProps> = ({children}) => {

  const { useGetPostsQuery } = postsApi
  const { useGetLeaderboardQuery } = valorantApi
  const globalDispatch = useDispatch()
  
  const { 
    data: posts, 
    isLoading: isPostsLoading
  } = useGetPostsQuery(null)
  
  const { 
    data: board, 
    isLoading: isLeaderboardLoading
  } = useGetLeaderboardQuery('ap')

  useEffect(()=>{
    if (board) {
      globalDispatch(globalSlice?.actions?.setLeaderboard(board))
    }
  }, [board])

  useEffect(()=>{
    if (posts) {
      globalDispatch(globalSlice?.actions?.setPosts(posts))
    }
  }, [posts])
  
  return (
    <div>
      {children}
    </div>
  )
}

export default GlobalLayout