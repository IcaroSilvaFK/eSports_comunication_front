import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { createStandaloneToast } from '@chakra-ui/toast'

import { theme } from '../styles/theme/index'
import '../styles/global.css'
import { ModalCreateUser } from '../components/Modal'
import { ModalCreateAd } from '../components/ModalCreateAd'

const { ToastContainer, toast } = createStandaloneToast()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
      <ModalCreateUser />
      <ModalCreateAd />
    </ChakraProvider>
  )
}

export { toast }

export default MyApp
