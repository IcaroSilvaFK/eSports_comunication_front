import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import { IoGameControllerOutline } from 'react-icons/io5'
import { AiOutlineUser } from 'react-icons/ai'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useUser } from '../../../store/user'
import { useModal } from '../../../store/modal'

interface IFormProps {
  username: string
  name: string
}

export function FormRegister() {
  const theme = useTheme()
  const { register, handleSubmit, reset } = useForm<IFormProps>()
  const { create } = useUser((state) => state)
  const toast = useToast()
  const { close } = useModal((state) => state)

  const onSubmit: SubmitHandler<IFormProps> = async ({ name, username }) => {
    try {
      await create({
        name,
        username,
      })
      reset()
      toast({
        title: 'Logado com sucesso',
        description: `Olá seja bem vindo`,
        isClosable: true,
        status: 'success',
        duration: 9000,
        position: 'top',
      })
      close()
    } catch (err) {
      console.log(err)
      toast({
        title: 'Ocorreu um erro',
        description: `Olá desculpe mais ocorreu um erro e trabalharemos para resolver`,
        isClosable: true,
        status: 'error',
        duration: 9000,
        position: 'top',
      })
    }
  }

  return (
    <Flex as="form" flexDir="column" alignItems="center" gap="4" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLeftAddon
          borderColor="violet.500"
          bg="violet.500"
          children={<IoGameControllerOutline color={theme.colors.white} size={20} />}
        />
        <Input
          borderColor={theme.colors.violet[300]}
          _focusVisible={{
            borderColor: 'violet.500',
          }}
          type="text"
          placeholder="Digite seu nickname"
          {...register('username')}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon
          borderColor="violet.500"
          bg="violet.500"
          children={<AiOutlineUser color={theme.colors.white} size={20} />}
        />
        <Input
          borderColor={theme.colors.violet[300]}
          _focusVisible={{
            borderColor: 'violet.500',
          }}
          type="text"
          placeholder="Digite seu nome"
          {...register('name')}
        />
      </InputGroup>
      <Button
        type="submit"
        variant="solid"
        bg="violet.500"
        _hover={{
          bg: 'violet.700',
        }}
      >
        Criar conta
      </Button>
    </Flex>
  )
}
