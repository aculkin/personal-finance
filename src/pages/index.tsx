import {
  Button,
  ButtonGroup,
  Heading,
  Link,
  useColorMode,
  Text,
  Flex,
  Box,
  FormLabel,
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
import { useAppState, useAuth } from '../hooks'

export default function Home() {
  const { user, signOut } = useAuth()
  const { toggleColorMode } = useColorMode()
  const { startDate, endDate, changeDate } = useAppState()

  return (
    <Flex alignItems="center" direction="column">
      <Heading>Finance Planning</Heading>
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
        <Flex direction="row" justifyContent="space-evenly" maxWidth="50%">
          <Flex direction="column" width="100%" mr={2}>
            <FormLabel>Start Date</FormLabel>
            <SingleDatepicker
              name="start date picker"
              date={startDate}
              maxDate={endDate}
              onDateChange={changeDate(true)}
            />
          </Flex>
          <Flex direction="column" width="100%">
            <FormLabel>End Date</FormLabel>
            <SingleDatepicker
              minDate={startDate}
              name="end date picker"
              date={endDate}
              onDateChange={changeDate(false)}
            />
          </Flex>
        </Flex>
        <AccountsChart />
      </Box>
    </Flex>
  )
}
