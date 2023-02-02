import { format } from 'date-fns'
import {
  FormControl,
  NumberInput,
  NumberInputField,
  Input,
  FormLabel,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'

interface BalanceForm {
  date?: Date
  amount?: number
  accountId?: number
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const BalanceForm = ({
  date,
  amount,
  accountId,
  handleChange,
}: BalanceForm) => {
  return (
    <FormControl alignItems="center">
      <FormLabel mb="0">Amount:</FormLabel>
      <InputGroup>
        <InputLeftAddon children="#" />
        <NumberInput width="100%">
          <NumberInputField
            value={amount}
            name="amount"
            onChange={handleChange}
          />
        </NumberInput>
      </InputGroup>
      <FormLabel mb="0">Account Id</FormLabel>
      <InputGroup>
        <InputLeftAddon children="#" />
        <NumberInput width="100%">
          <NumberInputField
            value={accountId}
            name="accountId"
            onChange={handleChange}
          />
        </NumberInput>
      </InputGroup>
      <FormLabel mb="0">Balance Date:</FormLabel>
      <Input
        type="date"
        name="date"
        onChange={handleChange}
        value={date ? format(date, 'yyyy-MM-dd') : null}
      />
    </FormControl>
  )
}

export { BalanceForm }
