import {
  FormControl,
  NumberInput,
  NumberInputField,
  Input,
  FormLabel,
} from '@chakra-ui/react'

interface BalanceForm {
  date?: Date
  amount?: number
  accountId?: number
}

const BalanceForm = ({ date = new Date(), amount, accountId }: BalanceForm) => {
  return (
    <FormControl alignItems="center">
      <FormLabel mb="0">Amount:</FormLabel>
      <NumberInput>
        <NumberInputField value={amount} />
      </NumberInput>
      <FormLabel mb="0">Account Id</FormLabel>
      <NumberInput>
        <NumberInputField value={accountId} />
      </NumberInput>
      <FormLabel mb="0">Balance Date:</FormLabel>
      <Input type="date" />
    </FormControl>
  )
}

export { BalanceForm }
