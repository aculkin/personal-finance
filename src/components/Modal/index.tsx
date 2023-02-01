import {
  Button,
  Modal as SystemModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

const Modal = ({
  title,
  isOpen,
  handleClose,
  children,
}: {
  title: string
  isOpen: boolean
  handleClose: () => void
  children: ReactNode
}) => {
  return (
    <SystemModal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </ModalFooter>
      </ModalContent>
    </SystemModal>
  )
}

export { Modal }
