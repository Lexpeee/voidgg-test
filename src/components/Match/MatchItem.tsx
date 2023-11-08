import { FC, useState, useEffect } from 'react'
import {
  Grid, 
  Flex, 
  Card,
  Title, 
  Image,
  Text
} from '@mantine/core'
import { filter } from 'lodash'
import { AGENTS } from '@/helpers/constants'

type MatchItemProps = {
  name: string
  tag: string
  match: any
}

const MatchItem:FC<MatchItemProps> = ({
  name, 
  tag,
  match
}) => {
  const allPlayers = match?.players?.all_players

  const mainPlayer = filter(allPlayers, player => player?.name === name && player?.tag === tag)[0]

  const selectedAgent = filter(AGENTS, agent => agent?.displayName === mainPlayer?.character)[0]

  useEffect(()=>{
    console.log("mainplayer", mainPlayer, selectedAgent)
    console.log("match", match)
    console.log("agent", selectedAgent)
  }, [])
  
  return (
    <Card
      withBorder
    >
      <Flex direction="row" justify={"space-between"}>
        <Image
          src={selectedAgent?.displayIcon}
          height={50}
        />
      </Flex>
    </Card>
  )
}

export default MatchItem