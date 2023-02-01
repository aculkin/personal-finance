import { useContext } from 'react'
import { appContext } from '../providers/AppProvider'

const useAccounts = () => {
  const context = useContext(appContext)
  return [context.accounts, context.setAccounts]
}

export { useAccounts }
