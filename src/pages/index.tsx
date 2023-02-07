import { useColorMode, Flex, Box } from '@chakra-ui/react'

import { AccountsChart } from '../components'
import { AppLayout } from '../layouts'
import { useAppState, useAuth } from '../hooks'

export default function Home() {
  return (
    <AppLayout>
      <AccountsChart />
    </AppLayout>
  )
}
