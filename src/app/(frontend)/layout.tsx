import React from 'react'
import { Inter } from 'next/font/google'

import './styles.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html className={`${inter.className} scroll-smooth`} lang="en">
            <head>
                <link href="/api/media/file/male-technologist.png" rel="icon" sizes="32x32" />
            </head>
            <body className="font-inter">
                <main className="container">
                    <div className="max-w-[625px] mx-auto py-12 sm:py-24">{children}</div>
                </main>
            </body>
        </html>
    )
}
