import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

function redirectToAuth() {
  const router = useRouter();
  router.push('/auth');
}

export default function Home() {
  return (
    <>
      <div className='flex h-screen justify-center items-center'>
        <div className='bg-white bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
          <h1 className='text-black ml-20 mb-5'>Expensive Control</h1>
          <Link href="/auth" className='text-blue-500'>Authentication</Link>
        </div>
      </div>
    </>
  )
}
