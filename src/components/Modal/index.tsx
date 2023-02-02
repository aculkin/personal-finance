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
  handleSubmit = () => null,
  children,
  isLoading = false,
}: {
  title: string
  isOpen: boolean
  handleClose: () => void
  handleSubmit?: () => void
  children: ReactNode
  isLoading?: boolean
}) => {
  return (
    <SystemModal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            variant="ghost"
            mr={3}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </SystemModal>
  )
}

export { Modal }
