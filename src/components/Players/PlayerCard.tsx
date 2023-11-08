import { FC } from 'react'
import { 
  Card,
  Flex,
  Group,
  Title,
  Text
} from '@mantine/core'

type PlayerCardProps = {
  player: any
}

const PlayerCard:FC<PlayerCardProps> = ({
  player
}) => {
  return (
    <Card 
      withBorder
      p={4}
    >
      <Group>
        <Flex direction={'column'} align={'center'} mr={24}>
          <Text size='xs'>Rank</Text>
          <Title order={2}>{player?.leaderboardRank}</Title>
        </Flex>
        <Card.Section
          p={10}
        >
          <Flex direction="column">
            <Title order={4}>
              {player?.IsAnonymized ? "Secret Agent" : <>{player?.gameName}#{player?.tagLine}</>}
            </Title>
            <Text size="xs">
                WINS: {player?.numberOfWins}
            </Text>
          </Flex>
        </Card.Section>
      </Group>
    </Card>
  )
}

export default PlayerCard