import { Button } from '@/components/Button';
import Link from 'next/link';
import BG_IMAGE from '../../../public/assets/loginBG.jpg';
import PasswordInput from '@/components/PasswordInput/PasswordInput';

export default function Login() {
  return (
    <div id='div1' style={{ backgroundImage: `url(${BG_IMAGE.src})`, backgroundSize: 'cover' }}>
      <div id='div2' className="min-h-screen flex flex-col items-center justify-center">
        <h1 id='h1-1' className="text-3xl font-extrabold text-white mb-4">Expensive Control</h1>
        <div id='div3' className="w-1/3 bg-gray-100 p-8 rounded shadow-md">
          <h2 id='h2-1' className="text-2xl font-bold text-black mb-4">Login</h2>
          <label id='label-1' className='block text-block mb-1 text-black' htmlFor="username">Username</label>
          <input id='input-1'
            className="w-full px-3 py-2 rounded border text-black"
            type="text"
            placeholder="Type your username"
          />
          <label id='label-1' className='block text-block mb-1 text-black' htmlFor="username">Password</label>
          <PasswordInput></PasswordInput>
          <Button title='Login'/>
          <p className="text-blue-500 text-sm underline cursor-pointer mt-2">
            <Link className="text-blue-500" href="/forgot-password">Forgot your password?</Link>
          </p>
          <p className="text-center mt-4 text-black">
            Don&apos;t have an account?{' '}
            <Link className="text-blue-500" href="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
