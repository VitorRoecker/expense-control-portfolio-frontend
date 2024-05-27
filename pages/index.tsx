import { useSession } from 'next-auth/react';
import NavBar from '../components/navbar';
import HomePage from './home'
import { Layout } from 'antd'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Auth from './auth';

const { Footer } = Layout;


export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <HomePage></HomePage>
      <Footer style={{ textAlign: 'center' }}>Expensive Control ©2023 Created by Vitor A Roecker</Footer>
    </>
  )
}
