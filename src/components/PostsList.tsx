import { useEffect, useState } from 'react'
import { forEach, size, map } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { Grid, Title, TextInput } from '@mantine/core'

import { postsApi } from '@/store'
import PostCard from './PostCard'

import { useDebouncedCallback } from 'use-debounce'

const PostsListComponent = () => {
  const router = useRouter()

  const { useGetPostsQuery } = postsApi

  const [page, setPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const [filteredPosts, setFilteredPosts] = useState<any>([])
  
  const [querySettings, setQuerySettings] = useState({
    page,
    limit: 5,
    sortBy: 'createdAt',
    order: 'desc',
    search: searchInput
  })
  
  const { 
    data: posts,
    isLoading: isPostsLoading
  } = useGetPostsQuery(querySettings)

  const onRefreshPosts = useDebouncedCallback(()=>{
    setIsSearching(!!searchInput)
    setQuerySettings(prevState => ({
      ...prevState, 
      page,
      search: searchInput
    }))
  }, 500)
  
  useEffect(()=>{
    onRefreshPosts()
  }, [page, searchInput])

  useEffect(()=>{
    if (!searchInput && posts) {
      setFilteredPosts([...filteredPosts, ...posts])
      return
    }
  }, [posts])

  return (
    <>
      <Grid>
        <Grid.Col span={12} mb={12}>
          <TextInput
            value={searchInput}
            onChange={e => setSearchInput(e?.target?.value)}
            placeholder="Search for a post"
          />
        </Grid.Col>
      </Grid>
      {/* Posts List */}
      <Grid>
        {isSearching && 
          <Title order={6} mt={12}>
            {size(posts)} results found for "{searchInput}"
          </Title>
        }
        <InfiniteScroll
          dataLength={size(posts)}
          next={() => setPage(prevState => prevState + 1)}
          hasMore={!!size(posts)}
          loader="Loading..."
          endMessage=""
        >
          {map(searchInput ? posts : filteredPosts, (post, i) => {
            return <Grid.Col 
              span={12} 
              key={i}
              onClick={() => router.push(`/posts/${post?.id}`)}
              mb={6}
            > 
              <PostCard
                post={post}
              />
            </Grid.Col>
          })}
        </InfiniteScroll>
      </Grid>
    </>
  )
}

export default PostsListComponent