import { FormControl, FormLabel, Switch, Input } from '@chakra-ui/react'

interface AccountForm {
  name?: string
  asset?: boolean
  liquid?: boolean
}

const AccountForm = ({ name, asset, liquid }: AccountForm) => {
  return (
    <FormControl alignItems="center">
      <FormLabel mb="0">Account Name:</FormLabel>
      <Input value={name} />
      <FormLabel mb="0">
        This account is {liquid ? 'liquid' : 'not liquid'}
      </FormLabel>
      <Switch checked={liquid} />
      <FormLabel mb="0">
        This account is an {asset ? 'asset' : 'liability'}
      </FormLabel>
      <Switch checked={asset} />
    </FormControl>
  )
}

export { AccountForm }
