import Head from 'next/head'
import React from 'react'
import Header from '@/components/Header'
import StyledJsxRegistry from '@/pages/registry'

function Layout({children} : {children : React.ReactNode}) {
  return (
    <>
        <Head>
            <title>The good corner</title>
            <meta name="description" content="The good corner" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className='main-content'>
            <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </main>
    </>
    )
}

export default Layout