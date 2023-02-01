import { useState } from 'react'
import { Button } from '@chakra-ui/react'

import { Modal } from '..'
import { BalanceForm } from '../forms'

const NewBalanceButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Balance</Button>
      <Modal
        title="New Balance"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <BalanceForm />
      </Modal>
    </>
  )
}

export { NewBalanceButton }
