import {
  Button,
  ButtonGroup,
  Heading,
  Link,
  useColorMode,
  Text,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/initSupabase'

export default function Home() {
  const [user, setUser] = useState(null)
  const { toggleColorMode } = useColorMode()

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      setUser(null)
      console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  useEffect(() => {
    getUser()
  }, [])

  console.log('user!', user)

  return (
    <>
      <Heading>Welcome to my finance app</Heading>
      <ButtonGroup>
        <Button onClick={toggleColorMode}>Switch presentation mode</Button>
        <Button as={Link} href="/login">
          Log In!
        </Button>
        <Button onClick={signOut}>Log Out</Button>
      </ButtonGroup>
      <Text>
        Current User: {user ? user.email : 'no one logged in currently'}
      </Text>
    </>
  )
}
