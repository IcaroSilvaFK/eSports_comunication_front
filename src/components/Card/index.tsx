import { useState, useEffect } from 'react'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { BigHead } from '@bigheads/core'
import { format } from 'date-fns'
import { BsDiscord } from 'react-icons/bs'
import { useUser } from '../../store/user'

interface ICardProps {
  created_at: string
  description: string
  game_image: string
  game_name: string
  author?: {
    username: string
    name: string
    id: string
  }
  is_active: boolean
}

export function Card({ author, ...props }: ICardProps) {
  const [isRendered, setIsRendered] = useState(false)
  const { user } = useUser((state) => state)

  useEffect(() => {
    setIsRendered(true)
  }, [])

  if (!isRendered) return null

  return (
    <Flex
      flexDir="column"
      color="zinc.400"
      rounded="sm"
      overflow="hidden"
      shadow="base"
      height="100%"
    >
      <Flex>
        <Image src={props.game_image} alt={props.game_name} w="350px" h="200" objectFit="cover" />
      </Flex>
      <Flex flexDir="column" bg="zinc.700" pb="4" pt="2">
        <Flex p="2" justify="space-between">
          <Text color="white" fontSize="xl" fontFamily="heading">
            {props.game_name}
          </Text>
          <Text fontSize="sm" alignSelf="flex-start" justifySelf="flex-end">
            {format(new Date(props.created_at), 'dd/MM/yyyy')}
          </Text>
        </Flex>

        <Box p="4" bg="zinc.600">
          <Text fontSize="lg" color="white">
            {props.description}
          </Text>
        </Box>
        {author && (
          <Flex
            __css={{
              svg: {
                width: 20,
              },
            }}
            display="flex"
            flexDir="row"
            alignItems="center"
            w="100%"
            flex={1}
            px="4"
            mt="2"
          >
            <BigHead />
            <Flex flexDir="column">
              <Text>{author.name}</Text>
              <Text color="white">@{author.username}</Text>
            </Flex>

            <Flex
              flexDir="column"
              alignItems="flex-end"
              display="flex"
              flex={1}
              __css={{
                svg: {
                  width: '20px',
                  height: '20px',
                },
              }}
              gap="1"
            >
              {user?.id !== author.id && (
                <Button
                  _hover={{
                    bg: 'violet.700',
                  }}
                  _active={{
                    bg: 'violet.900',
                  }}
                  color="white"
                  variant="solid"
                  bg="violet.500"
                  gap="1"
                >
                  <BsDiscord size={20} />
                  Discord
                </Button>
              )}

              <Text
                alignSelf="flex-end"
                justifySelf="flex-end"
                bg="green.300"
                color="white"
                fontWeight="bold"
                py="1"
                px="2"
                rounded="lg"
              >
                {props.is_active ? 'Ativo' : 'Fechado'}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
