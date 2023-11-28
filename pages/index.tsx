import { Inter } from 'next/font/google'
import NavBar from '../components/navbar';
import HomePage from './home'
import { Layout } from 'antd'

const { Footer } = Layout;


export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <HomePage></HomePage>
      <Footer style={{ textAlign: 'center' }}>Expensive Control ©2023 Created by Vitor A Roecker</Footer>
    </>
  )
}
