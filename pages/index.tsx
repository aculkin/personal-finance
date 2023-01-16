import Head from 'next/head'
import {
  ChakraProvider,
  Button,
  Heading,
  Link,
  useColorMode,
} from '@chakra-ui/react'

export default function Home() {
  const { toggleColorMode } = useColorMode()
  return (
    <ChakraProvider>
      <Head>
        <title>Personal Finance App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Welcome to my finance app</Heading>
        <Button onClick={toggleColorMode}>Switch dark mode</Button>
        <Button as={Link} href="/login">
          Log In!
        </Button>
      </main>
    </ChakraProvider>
  )
}
