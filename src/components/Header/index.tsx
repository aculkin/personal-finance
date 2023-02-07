import {
  Text,
  Button,
  Link,
  Flex,
  useColorMode,
  ButtonGroup,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '../../hooks'

const Header = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { toggleColorMode } = useColorMode()

  const handleSignout = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      router.push('/login')
    }
  }

  return (
    <Flex width="100%" height="100%" flexDirection="row" alignItems="center">
      <Text flexWrap="nowrap">
        Finance Planning -
        {user ? ` Current User: ${user.email}` : ' no one logged in currently'}
      </Text>
      <ButtonGroup
        flex="1"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {user ? (
          <Button isLoading={isLoading} onClick={handleSignout}>
            Log Out
          </Button>
        ) : (
          <Button as={Link} href="/login">
            Log In!
          </Button>
        )}
        <Button onClick={toggleColorMode}>Switch presentation mode</Button>
      </ButtonGroup>
    </Flex>
  )
}

export { Header }
