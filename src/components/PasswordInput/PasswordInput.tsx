'use client'

import React, { useState } from 'react'

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='relative'>
        <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Type your password'
            className='w-full px-3 py-2 rounded border text-black'
        />
        <button
            type='button'
            onClick={handleTogglePassword}
            className='absolute top-2 right-2 cursor-pointer'
        >
            {showPassword ? '🙈' : '👁️'}
        </button>
    </div>
  )
}
