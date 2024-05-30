import NextAuthSessionProvider from '@/providers/sessionProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthSessionProvider>
        <Component {...pageProps} />
      </NextAuthSessionProvider>

      <ToastContainer></ToastContainer>
    </>
  )
}
