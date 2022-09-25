import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'

import { useModal } from '../../store/modal'
import { FormLogin } from './FormLogin'
import { FormRegister } from './FormRegister'

export function ModalCreateUser() {
  const [modalMode, setModalMode] = useState('login')
  const { close, isOpen } = useModal((state) => state)

  function toggleModeModalRegister() {
    setModalMode('register')
  }

  function toggleModeModalLogin() {
    setModalMode('login')
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent bg="zinc.700" color="zinc.100">
        <ModalHeader>{modalMode === 'login' ? 'Entrar' : 'Criar Conta'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalMode === 'login' ? <FormLogin /> : <FormRegister />}</ModalBody>
        <ModalFooter display="flex" justifyContent="center" gap="6">
          <Button
            variant="link"
            color="violet.500"
            textDecor={modalMode === 'login' ? 'underline' : 'none'}
            onClick={toggleModeModalLogin}
          >
            Login
          </Button>
          <Button
            variant="link"
            color="violet.500"
            onClick={toggleModeModalRegister}
            textDecor={modalMode !== 'login' ? 'underline' : 'none'}
          >
            Cadastro
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
