import { useContext } from 'react'
import { appContext } from '../providers/AppProvider'

const useTransactions = () => {
  const context = useContext(appContext)
  return [context.transactions, context.setTransactions]
}

export { useTransactions }
