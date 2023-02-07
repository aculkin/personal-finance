import { Flex, Text, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex alignContent="center" justifyContent="center">
      <Text>
        Built by{' '}
        <Link href="https://www.linkedin.com/in/andrew-culkin/">
          Andrew Culkin
        </Link>
      </Text>
    </Flex>
  )
}

export { Footer }
