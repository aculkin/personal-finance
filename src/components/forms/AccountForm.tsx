import {
  FormControl,
  FormLabel,
  Switch,
  Input,
  InputGroup,
} from '@chakra-ui/react'
import React from 'react'

interface AccountForm {
  name?: string
  asset: boolean
  liquid: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AccountForm = ({ name, asset, liquid, handleChange }: AccountForm) => (
  <FormControl alignItems="center">
    <FormLabel mb="0">Account Name:</FormLabel>
    <InputGroup>
      <Input
        value={name}
        name="name"
        onChange={handleChange}
        placeholder="Checking Account..."
      />
    </InputGroup>
    <InputGroup mt="2" alignItems="center">
      <Switch isChecked={liquid} name="liquid" onChange={handleChange} mr="2" />
      <FormLabel mb="0">
        This account is <u>{liquid ? 'liquid' : 'not liquid'}</u>
      </FormLabel>
    </InputGroup>
    <InputGroup mt="2" alignItems="center">
      <Switch isChecked={asset} name="asset" onChange={handleChange} mr="2" />
      <FormLabel mb="0">
        This account is an <u>{asset ? 'asset' : 'liability'}</u>
      </FormLabel>
    </InputGroup>
  </FormControl>
)

export { AccountForm }
