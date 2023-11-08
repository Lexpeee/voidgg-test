import { FC, useState, useEffect } from 'react'
import {
  Grid, 
  Flex, 
  Card,
  Space,
  Title, 
  Group, 
  Image,
  Stack,
  Text
} from '@mantine/core'
import { 
  filter ,
  toLower
} from 'lodash'
import { AGENTS, MAPS } from '@/helpers/constants'
import moment from 'moment'

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

  const player = filter(allPlayers, player => player?.name === name && player?.tag === tag)[0]
  const playerStats = player?.stats

  const selectedAgent = filter(AGENTS, agent => agent?.displayName === player?.character)[0]
  const winningTeam = toLower(player?.team) && match?.teams?.[toLower(player?.team)]?.has_won
  const selectedMap = filter(MAPS, map => map?.displayName === match?.metadata?.map)[0]


  const convertSeconds = (time: number): string => {
    const seconds = Math.floor(time % 60) > 9 ? Math.floor(time % 60) : `0${Math.floor(time % 60)}`
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds}`
  }

  return (
    <Card
      withBorder
      style={{
        background: winningTeam ? 'linear-gradient(90deg, rgba(109, 159, 113, 1), rgba(0,0,0,0))' :'linear-gradient(90deg, rgba(211, 63, 73, 1), rgba(0,0,0,0))',
      }}
      p={0}
    >
      <Flex direction="row" justify="space-between" align={'center'} p={10}>
        <Image
          src={selectedMap?.listViewIcon}
          style={{
            position: 'absolute',
            zIndex: -10,
            filter: 'brightness(0.7)'
          }}
        />

        <Group>
          <Image
            src={selectedAgent?.displayIcon}
            height={60}
          />
          <Stack>
            <Text c="white">KDA: {playerStats?.kills}/{playerStats?.deaths}/{playerStats?.assists}</Text>
            <Text c="white">Score: {playerStats?.score}</Text>
          </Stack>
          
        </Group>
        <Flex direction="column" align={'center'} style={{ color: '#ffffff'}}>
          <Text>{winningTeam ? "WIN" : "LOSS"}</Text>
          <Title>
            {match?.teams?.[toLower(player?.team)]?.rounds_won} - {match?.teams?.[toLower(player?.team)]?.rounds_lost}
          </Title>
        </Flex>
        <Stack>
          <Text c='white'>{convertSeconds(match?.metadata?.game_length)}</Text>
          <Text c='white'>{moment(match?.metadata?.game_start_patched).format('MMMM D, YYYY hh:MMa')}</Text>
        </Stack>
      </Flex>
    </Card>
  )
}

export default MatchItem