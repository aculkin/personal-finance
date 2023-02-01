import { useContext } from 'react'
import { appContext } from '../providers/AppProvider'

const useBalances = () => {
  const context = useContext(appContext)
  return [context.balances, context.setBalances]
}

export { useBalances }
