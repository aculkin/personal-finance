import { useState } from 'react'
import { Button } from '@chakra-ui/react'

import { Modal } from '..'
import { AccountForm } from '../forms'

const NewAccountButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Account</Button>
      <Modal
        title="New Account"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <AccountForm />
      </Modal>
    </>
  )
}

export { NewAccountButton }
