import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

function App({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: 'http://localhost:3001',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
