import { useEffect, useState } from 'react'
import { forEach, size, map } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { Grid } from '@mantine/core'
import { useSelector } from 'react-redux'
import { postsApi, valorantApi } from '@/store'
import PlayerCard from '@/components/Players/PlayerCard'

const LIMIT = 100

const PlayersListComponent = () => {
  const router = useRouter()

  const board = useSelector(state => state.global.leaderboard)
  
  const [playersPage, setPlayersPage] = useState(1)
  const [players, setPlayers] = useState([])

  /** Limit players on display */
  useEffect(()=>{
    let limitedPlayers = []
    forEach(board?.players, (p, i) => {
      if ((i + 1) > LIMIT * playersPage && p) {
        return true
      }
      limitedPlayers = limitedPlayers?.concat(p)
    })
    setPlayers(limitedPlayers)
    
  }, [board, playersPage])

  return (
    <Grid>
      {size(players) > 0 && 
        <InfiniteScroll
          dataLength={size(players)}
          next={() => setPlayersPage(prevState => prevState + 1)}
          hasMore={!!size(players)}
          loader="Loading..."
          endMessage=""
        >
          {map(players, (player, i) => {
            const isAnonymous = (player?.gameName && player?.tagLine)
            return <Grid.Col 
              span={12} 
              key={i}
              onClick={() => isAnonymous && router.push(`/player/${player?.gameName}/${player?.tagLine}`)}
            > 
              <PlayerCard
                player={player}
              />
            </Grid.Col>
          })}
        </InfiniteScroll>
      }
    </Grid>
  )
}

export default PlayersListComponent