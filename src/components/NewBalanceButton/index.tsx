import { useState } from 'react'
import { Button } from '@chakra-ui/react'

import { Modal } from '..'
import { BalanceForm } from '../forms'
import { useAppState } from '../../hooks'

const defaultBalanceData = {
  date: new Date(),
  amount: null,
  accountId: null,
}

const NewBalanceButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [balanceData, setBalanceData] = useState(defaultBalanceData)
  const { addBalance } = useAppState()

  const { date, amount, accountId } = balanceData

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBalanceData({
      ...balanceData,
      [name]: name == 'date' ? new Date(value) : parseInt(value),
    })
    console.log('balanceData', balanceData)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await addBalance({
      date: date.toString(),
      amount,
      account_id: balanceData.accountId,
    })
    setIsLoading(false)
    setBalanceData(defaultBalanceData)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Balance</Button>
      <Modal
        title="New Balance"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <BalanceForm
          date={date}
          amount={amount}
          accountId={accountId}
          handleChange={handleChange}
        />
      </Modal>
    </>
  )
}

export { NewBalanceButton }
