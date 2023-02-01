import {
  FormControl,
  Select,
  NumberInput,
  NumberInputField,
  Input,
  Switch,
  FormLabel,
} from '@chakra-ui/react'

interface TransactionForm {
  name?: string
  frequency?: string
  interestRate?: number
  amount?: number
  payoffToAccount?: boolean
  priority?: number
  fromAccountId?: number
  toAccountId?: number
  startDate?: Date
}

const TransactionForm = ({
  name,
  frequency,
  interestRate,
  amount,
  payoffToAccount,
  priority,
  fromAccountId,
  toAccountId,
  startDate = new Date(),
}: TransactionForm) => {
  return (
    <FormControl alignItems="center">
      <FormLabel mb="0">Transaction Name:</FormLabel>
      <Input value={name} />
      <FormLabel mb="0">Frequency</FormLabel>
      <Select>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="biWeekly">Bi-Weekly</option>
        <option value="semiMonthly">Semi-Monthly</option>
        <option value="monthly">Monthly</option>
        <option value="daily">Quarterly</option>
        <option value="daily">Yearly</option>
      </Select>
      <FormLabel mb="0">Interest Rate:</FormLabel>
      <NumberInput>
        <NumberInputField value={interestRate} />
      </NumberInput>
      <FormLabel mb="0">Amount:</FormLabel>
      <NumberInput>
        <NumberInputField value={amount} />
      </NumberInput>
      <FormLabel mb="0">Payoff the account:</FormLabel>
      <Switch checked={payoffToAccount} />
      <FormLabel mb="0">Priority:</FormLabel>
      <NumberInput>
        <NumberInputField value={priority} />
      </NumberInput>
      <FormLabel mb="0">"From" Account Id</FormLabel>
      <NumberInput>
        <NumberInputField value={fromAccountId} />
      </NumberInput>
      <FormLabel mb="0">"To" Account Id</FormLabel>
      <NumberInput>
        <NumberInputField value={toAccountId} />
      </NumberInput>
      <FormLabel mb="0">Start Date:</FormLabel>
      <Input type="date" />
    </FormControl>
  )
}

export { TransactionForm }
