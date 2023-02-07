import {
  Text,
  Button,
  Link,
  Flex,
  useColorMode,
  ButtonGroup,
} from '@chakra-ui/react'
import { useAuth } from '../../hooks'

const Header = () => {
  const { user, signOut } = useAuth()
  const { toggleColorMode } = useColorMode()
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
          <Button onClick={signOut}>Log Out</Button>
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
