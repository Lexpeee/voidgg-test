import { useRouter } from 'next/router'
import { Container, Title } from '@mantine/core'
import PostCard from '@/components/PostCard'
import { postsApi } from '@/services'

const PostPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { useGetPostDetailsQuery } = postsApi

  const { 
    data:post,
    isLoading
  } = useGetPostDetailsQuery(id)

  if (isLoading) {
    return <Container>
      <Title order={1}>
        Loading..
      </Title>
    </Container>
  }
  
  return (
    <Container>
      <PostCard
        post={post}
      />
    </Container>
  )
}

export default PostPage