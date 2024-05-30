import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                documentoFederal: {
                    label: 'documento',
                    type: 'text '
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                debugger
                const response = await fetch('https://localhost:7047/api/Auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        documentoFederal: credentials?.documentoFederal,
                        password: credentials?.password
                    })
                })

                const user = await response.json();

                if (user && response.ok) {
                    return user;
                }

                return null
            }
        })
    ],
    pages: {
        signIn: './'
    }
}
