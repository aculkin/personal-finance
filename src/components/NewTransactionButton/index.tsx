import { useState } from 'react'
import { Button } from '@chakra-ui/react'

import { Modal } from '..'
import { TransactionForm } from '../forms'

const NewTransactionButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Transaction</Button>
      <Modal
        title="New Transaction"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <TransactionForm />
      </Modal>
    </>
  )
}

export { NewTransactionButton }
