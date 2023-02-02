import { useState } from 'react'
import { Button } from '@chakra-ui/react'

import { Modal } from '..'
import { TransactionForm } from '../forms'
import { useAppState } from '../../hooks'

const defaultTransactionData = {
  name: '',
  frequency: null,
  interestRate: null,
  amount: null,
  payoffToAccount: false,
  priority: 1,
  fromAccountId: null,
  toAccountId: null,
  startDate: new Date(),
}

const NewTransactionButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState(defaultTransactionData)
  const { addTransaction } = useAppState()

  const {
    name,
    frequency,
    interestRate,
    amount,
    payoffToAccount,
    priority,
    fromAccountId,
    toAccountId,
    startDate,
  } = transactionData

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setTransactionData({
      ...transactionData,
      [name]: name == 'startDate' ? new Date(value) : value,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await addTransaction({
      name,
      frequency,
      interest_rate: interestRate,
      amount,
      payoff_to_account: payoffToAccount,
      priority,
      from_account: fromAccountId,
      to_account: toAccountId,
      start_date: startDate.toString(),
    })
    setTransactionData(defaultTransactionData)
    setIsLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Transaction</Button>
      <Modal
        title="New Transaction"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
      >
        <TransactionForm
          name={name}
          frequency={frequency}
          interestRate={interestRate}
          amount={amount}
          payoffToAccount={payoffToAccount}
          priority={priority}
          fromAccountId={fromAccountId}
          toAccountId={toAccountId}
          startDate={startDate}
          handleChange={handleChange}
        />
      </Modal>
    </>
  )
}

export { NewTransactionButton }
