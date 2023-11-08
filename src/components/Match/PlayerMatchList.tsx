import { useEffect, useState } from 'react'
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
import MatchItem from './MatchItem'

const PlayerMatchList = ({
  name, 
  tag
}) => {

  const { useGetPlayerMatchesQuery } = valorantApi
  
  const { 
    data: matchesData,
  } = useGetPlayerMatchesQuery({
    name, tag
  })
  
  const [matches, setMatches] = useState([])

  useEffect(()=>{
    if (matchesData) {
      setMatches(matchesData?.data)
    }
  }, [matchesData])
  
  return (
    <Grid>
      {map(matches, (match, i) => {
        return <Grid.Col span={12}>
          <MatchItem
            key={i}
            name={name}
            tag={tag}
            match={match}
          />
        </Grid.Col>
      })}
    </Grid>
  )
}

export default PlayerMatchList