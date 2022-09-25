import { useEffect, useState } from 'react'
import { BigHead } from '@bigheads/core'
import { Button, Flex, Heading, Text, useTheme } from '@chakra-ui/react'
import { BiGame } from 'react-icons/bi'

import { useUser } from '../../store/user'
import { useModal } from '../../store/modal'
import { useAds } from '../../store/ads'

export function Header() {
  const { user, logout } = useUser((state) => state)
  const [isRendered, setIsRendered] = useState(false)
  const theme = useTheme()
  const { open } = useModal((state) => state)
  const { open: openAdModal } = useAds((state) => state)

  useEffect(() => {
    setIsRendered(true)
  }, [])

  return (
    <Flex
      as="header"
      maxW="1200px"
      w="100%"
      mx="auto"
      color="zinc.100"
      alignItems="center"
      justifyContent="space-between"
      py="8"
    >
      <Flex alignItems="center" gap="3">
        <Flex alignItems="center" gap="2">
          <BiGame color={theme.colors.violet[500]} size={40} />
          <Heading fontWeight="normal" size="lg">
            Olá Player
          </Heading>
        </Flex>

        {isRendered && user && (
          <Button
            variant="ghost"
            _hover={{
              bg: 'violet.500',
            }}
            _active={{
              bg: 'violet.700',
            }}
            onClick={openAdModal}
          >
            Criar anúncio
          </Button>
        )}
      </Flex>

      {isRendered && (
        <Flex
          display="flex"
          alignItems="center"
          gap="2"
          __css={{
            svg: {
              width: '80px',
            },
          }}
        >
          <BigHead />
          <Flex flexDir="column" alignItems="flex-start">
            <Text>Olá {user?.name || 'gamer'}</Text>
            {!user ? (
              <Button variant="link" onClick={open}>
                Clique aqui para entrar
              </Button>
            ) : (
              <Button variant="link" onClick={logout}>
                sair
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
