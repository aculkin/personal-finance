import {
  Button,
  ButtonGroup,
  Heading,
  Link,
  useColorMode,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { useState } from 'react'

import {
  AccountsChart,
  NewBalanceButton,
  NewTransactionButton,
  NewAccountButton,
} from '../components'
import { putDatesInOrder } from '../helpers'
import { useAuth } from '../hooks'

export default function Home() {
  const { user, signOut } = useAuth()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const { toggleColorMode } = useColorMode()

  const handlePickDate = (isStartDate: boolean) => (newDate: Date) => {
    const { firstDate, secondDate } = putDatesInOrder(
      isStartDate ? endDate : startDate,
      newDate
    )
    setStartDate(firstDate)
    setEndDate(secondDate)
  }

  return (
    <>
      <Heading>Welcome to my finance app</Heading>
      <ButtonGroup>
        <Button onClick={toggleColorMode}>Switch presentation mode</Button>
        <Button as={Link} href="/login">
          Log In!
        </Button>
        <Button onClick={signOut}>Log Out</Button>
        <NewAccountButton />
        <NewBalanceButton />
        <NewTransactionButton />
      </ButtonGroup>
      <Text>
        Current User: {user ? user.email : 'no one logged in currently'}
      </Text>
      <Box
        width={{
          sm: '30em',
          md: '48em',
          lg: '62em',
          xl: '80em',
          '2xl': '96em',
        }}
      >
        <Flex direction="row" justifyContent="space-evenly">
          <SingleDatepicker
            name="start date picker"
            date={startDate}
            onDateChange={handlePickDate(true)}
          />
          <SingleDatepicker
            name="end date picker"
            date={endDate}
            onDateChange={handlePickDate(false)}
          />
        </Flex>
        <AccountsChart startDate={startDate} endDate={endDate} />
      </Box>
    </>
  )
}
