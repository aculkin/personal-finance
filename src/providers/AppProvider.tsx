import type { ReactNode, Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

import type { Accounts, Balances, Transactions } from '../../types'
import {
  generateAccounts,
  generateBalances,
  generateTransactions,
} from '../../public/exampleData'

interface Context {
  accounts: Accounts[]
  balances: Balances[]
  transactions: Transactions[]
  setAccounts?: Dispatch<SetStateAction<any[]>>
  setBalances?: Dispatch<SetStateAction<any[]>>
  setTransactions?: Dispatch<SetStateAction<any[]>>
}

const initialContext = {
  accounts: [],
  balances: [],
  transactions: [],
}

const appContext = createContext<Context>(initialContext)

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState(generateAccounts() as Accounts[])
  const [balances, setBalances] = useState(generateBalances() as Balances[])
  const [transactions, setTransactions] = useState(
    generateTransactions() as Transactions[]
  )
  return (
    <appContext.Provider
      value={{
        accounts,
        setAccounts,
        balances,
        setBalances,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export { appContext, AppContextProvider }
