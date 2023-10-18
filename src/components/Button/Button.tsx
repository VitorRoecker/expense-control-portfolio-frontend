import { ButtonLinkOptions } from '@/types/components'
import React, { ReactNode } from 'react'

interface ButtonProps {
  onClick?: () => void
  children?: ReactNode
  title: string
  type?: 'button' | 'link'
  linkOptions?: ButtonLinkOptions
}

export const Button = ({
  onClick,
  title,
  type = 'button',
}: ButtonProps) => {   
      return (
    <button
        type="button"
        className="w-full bg-black text-white py-2 rounded mt-4"
        onClick={onClick}
        aria-label={type}>
        {title}
    </button>)
}