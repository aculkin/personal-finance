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
import { supabase } from '../../lib/initSupabase'

const Signup = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const toast = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { email, password, confirmPassword } = formData

  const validate = () => password === confirmPassword && !!email

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const signup = async () => {
    if (validate()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      router.push('/')
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
        <Heading mb={6}>Sign Up</Heading>
        <FormControl onSubmit={signup}>
          <Input
            placeholder="Email"
            mb={6}
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            mb={3}
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Input
            placeholder="Confirm password"
            mb={6}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <Button mb={3} colorScheme="teal" onClick={signup}>
            Sign Up
          </Button>
        </FormControl>
        <Text fontSize="sm">Already have an account?</Text>
        <Link fontSize="sm" href="/login">
          Click here to Login
        </Link>
      </Flex>
    </Flex>
  )
}

export default Signup