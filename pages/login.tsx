import {
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'

const Login = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={10}>
        <Heading mb={6}>Log In</Heading>
        <Input placeholder="example@gmail.com" mb={3} type="email" />
        <Input placeholder="*****" mb={6} type="password" />
        <Link href="/">
          <Button colorScheme="teal">Log In</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Login
