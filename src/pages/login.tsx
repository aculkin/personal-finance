import {
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  Link,
  Text,
  useToast,
  FormControl,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Database from '../../types'

import { useAuth } from '../hooks'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const toast = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const validate = () => !!email && !!password

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleLogin = async () => {
    if (validate()) {
      setIsLoading(true)
      try {
        await login(formData)
        router.push('/')
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      toast({
        title: 'Error!',
        description: 'Please enter all required information',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={10}>
        <Heading mb={6}>Log In</Heading>
        <FormControl onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            mb={3}
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            mb={6}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="teal"
            onClick={handleLogin}
            mb={3}
          >
            Log In
          </Button>
        </FormControl>
        <Text fontSize="sm">Need to create an account?</Text>
        <Link fontSize="sm" href="/signup">
          Click here to Signup
        </Link>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx)
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession()

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        initialSession: session,
        user: session.user,
      },
    }
  }
  return {
    props: {},
  }
}

export default Login
