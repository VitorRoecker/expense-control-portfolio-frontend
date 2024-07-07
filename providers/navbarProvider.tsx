'use client'

import NavBar from '@/components/navbar'
import { useSession } from 'next-auth/react'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

export default function NavbarProvider({ children }: Props) {
    const { data: session, status } = useSession()

    return (
        <>
            {
                <NavBar></NavBar>
            }
        </>
    )
}
