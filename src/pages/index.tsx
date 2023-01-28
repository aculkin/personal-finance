import {
  Button,
  ButtonGroup,
  Heading,
  Link,
  useColorMode,
  Text,
  Flex,
} from '@chakra-ui/react'

import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/initSupabase'
import { AccountsChart } from '../components'
import { putDatesInOrder } from '../helpers'

export default function Home() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [user, setUser] = useState(null)
  const { toggleColorMode } = useColorMode()

  const handlePickDate = (isStartDate: boolean) => (newDate: Date) => {
    const { firstDate, secondDate } = putDatesInOrder(
      isStartDate ? endDate : startDate,
      newDate
    )
    setStartDate(firstDate)
    setEndDate(secondDate)
  }

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
      <Flex direction="row">
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
    </>
  )
}
