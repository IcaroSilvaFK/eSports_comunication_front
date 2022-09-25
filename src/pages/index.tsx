import { useEffect } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { useAds } from '../store/ads'
import { Header } from '../components/Header'
import { useUser } from '../store/user'
import { Card } from '../components/Card'

const Home: NextPage = () => {
  const { ads, refetch, adsToUser, getAllByUser, getAllAds } = useAds((state) => state)
  const { user } = useUser((state) => state)

  useEffect(() => {
    ;(async () => {
      await getAllAds()
      if (!user) return
      await getAllByUser()
    })()
  }, [])

  console.log({ ads, adsToUser })

  return (
    <>
      <Head>
        <title>Icaro Vieira</title>
      </Head>
      <Flex h="100vh" w="100%" bg="zinc.900" alignItems="flex-start" flexDir="column">
        <Header />
        <Box
          borderBottom="1px solid"
          borderColor="zinc.400"
          maxW="1200px"
          w="100%"
          margin="0 auto"
          py="4"
          mb="4"
          color="zinc.100"
        >
          <Heading>Anúncios</Heading>
        </Box>
        <Flex maxW="1200px" w="100%" margin="0 auto" flexWrap="wrap" gap="4">
          {ads?.map((ad) => (
            <Card
              created_at={ad.created_at}
              description={ad.description}
              game_image={ad.game_image}
              key={ad.id}
              game_name={ad.game_name}
              author={ad.author}
              is_active={ad.is_active}
            />
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export default Home
