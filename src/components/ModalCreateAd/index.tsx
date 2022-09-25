import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Input,
  Text,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAds } from '../../store/ads'
import { useUser } from '../../store/user'

interface IFormProps {
  gameName: string
  description: string
  gameImage: string
}

export function ModalCreateAd() {
  const { register, handleSubmit, reset } = useForm<IFormProps>()
  const { create, refetch, isOpenModal, close } = useAds((state) => state)
  const toast = useToast()
  const { user } = useUser((state) => state)

  const onSubmit: SubmitHandler<IFormProps> = async ({ description, gameImage, gameName }) => {
    try {
      await create({
        description,
        gameImage,
        gameName,
      })
      reset()
      await refetch()
      toast({
        title: 'Anúncio criado',
        description: `Olá ${user?.name} o anúncio foi criado`,
        duration: 9000,
        isClosable: true,
        status: 'success',
        position: 'top',
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'O anúncio não foi criado',
        description: `Olá ${user?.name} o anúncio não pode ser criado por favor entre em contato caso o erro persistir foi criado`,
        duration: 9000,
        isClosable: true,
        status: 'error',
        position: 'top',
      })
    }
  }

  return (
    <Modal isOpen={isOpenModal} onClose={close}>
      <ModalOverlay />
      <ModalContent bg="zinc.700" color="zinc.100">
        <ModalHeader>
          <Heading size="lg" fontWeight="normal">
            Criar anúncio
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex as="form" flexDir="column" gap="4" onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDir="column" gap="1">
              <Text>Nome do game :</Text>
              <Input
                _focusVisible={{
                  borderColor: 'violet.500',
                }}
                {...register('gameName')}
              />
            </Flex>
            <Flex flexDir="column" gap="1">
              <Text>Link da Imagem do game :</Text>
              <Input
                _focusVisible={{
                  borderColor: 'violet.500',
                }}
                {...register('gameImage')}
              />
            </Flex>
            <Flex flexDir="column" gap="1">
              <Text>Descrição do anúncio :</Text>
              <Textarea
                _focusVisible={{
                  borderColor: 'violet.500',
                }}
                {...register('description')}
              />
            </Flex>
            <Flex justify="center">
              <Button
                type="submit"
                variant="ghost"
                _hover={{
                  bg: 'violet.500',
                }}
                _active={{
                  bg: 'violet.700',
                }}
              >
                Criar anúncio
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
