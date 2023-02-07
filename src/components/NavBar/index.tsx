import { Button, ButtonGroup, Flex, FormLabel } from '@chakra-ui/react'

import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { useAppState } from '../../hooks'
import { NewAccountModal, NewBalanceModal, NewTransactionModal } from '../'
import { useState } from 'react'

enum ModalOptionsEnum {
  Account = 'account',
  Balance = 'balance',
  Transaction = 'transaction',
}

const NavBar = () => {
  const [isNewAccountOpen, setIsNewAccountOpen] = useState(false)
  const [isNewBalanceOpen, setIsNewBalanceOpen] = useState(false)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const { startDate, endDate, changeDate } = useAppState()

  const openMenu = (name: ModalOptionsEnum) => {
    setIsNewBalanceOpen(name === ModalOptionsEnum.Balance)
    setIsNewTransactionOpen(name === ModalOptionsEnum.Transaction)
    setIsNewAccountOpen(name === ModalOptionsEnum.Account)
  }
  return (
    <Flex
      direction="column"
      width="100%"
      p="1"
      justifyContent="flex-start"
      height="100%"
    >
      <FormLabel mb={0}>Start Date</FormLabel>
      <SingleDatepicker
        name="start date picker"
        date={startDate}
        maxDate={endDate}
        onDateChange={changeDate(true)}
      />
      <FormLabel mb={0}>End Date</FormLabel>
      <SingleDatepicker
        minDate={startDate}
        name="end date picker"
        date={endDate}
        onDateChange={changeDate(false)}
      />
      <Flex direction="column" justifyContent="center" my="1">
        <Button my="1" onClick={() => openMenu(ModalOptionsEnum.Account)}>
          New Account
        </Button>
        <Button my="1" onClick={() => openMenu(ModalOptionsEnum.Balance)}>
          New Balance
        </Button>
        <Button my="1" onClick={() => openMenu(ModalOptionsEnum.Transaction)}>
          New Transaction
        </Button>
      </Flex>
      <NewAccountModal
        isOpen={isNewAccountOpen}
        setIsOpen={setIsNewAccountOpen}
      />
      <NewBalanceModal
        isOpen={isNewBalanceOpen}
        setIsOpen={setIsNewBalanceOpen}
      />
      <NewTransactionModal
        isOpen={isNewTransactionOpen}
        setIsOpen={setIsNewTransactionOpen}
      />
    </Flex>
  )
}

export { NavBar }
