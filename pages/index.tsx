import { Inter } from 'next/font/google'
import Auth from './auth';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Auth></Auth>
    </>
  )
}
