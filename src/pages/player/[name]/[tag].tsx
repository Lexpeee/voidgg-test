import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { valorantApi } from '@/services'
import { 
  map,
  size
} from 'lodash'
import {
  Image, 
  Card, 
  Grid, 
  Flex, 
  Group, 
  Title, 
  Text, 
  Avatar,
  Container,
  Badge
} from '@mantine/core'
import PlayerMatchList from '@/components/Match/PlayerMatchList'

const PlayerPage:FC = () => {
  const router = useRouter()
  const { name, tag } = router.query

  const { useGetPlayerAccountQuery } = valorantApi

  const { 
    data: playerData,
    isLoading: isPlayerLoading
  } = useGetPlayerAccountQuery({
    name, tag
  })

  const [player, setPlayer] = useState({})

  useEffect(()=>{
    if (playerData) {
      setPlayer(playerData?.data)
    }

  }, [playerData])

  if (isPlayerLoading) {
    return <>Loading</>
  }
  
  return (
    <Container>
      <Grid>
        <Grid.Col span={3}>

          <Card 
            withBorder
          >
            <Card.Section p={12}>
              <Image 
                src={player?.card?.large}
              />
            </Card.Section>
            <Flex direction="column" justify={'center'} align="center">
              <Title order={5}>
                {player?.name}
              </Title>
              <Badge color="gray">
                {player?.account_level}
              </Badge>
            </Flex>
          </Card>
          
        </Grid.Col>
        <Grid.Col span={9}>
          <span><Title>Matches <Text>Recent 5 games</Text></Title></span>
          {name && tag && 
            <PlayerMatchList
              name={name}
              tag={tag}
            />
          }
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default PlayerPage