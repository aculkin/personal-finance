import { ReactNode, useEffect } from 'react'
import { createContext, useState } from 'react'
import { eachDayOfInterval } from 'date-fns'

import type {
  Accounts,
  Account,
  Balances,
  Balance,
  Transactions,
  Transaction,
} from '../../types'
import {
  generateAccounts,
  generateBalances,
  generateTransactions,
} from '../../public/exampleData'
import { useAuth } from '../hooks'
import { putDatesInOrder, generateDateBalanceArray } from '../helpers'

export interface AccountBalance {
  date: Date
  balances: number[]
}

interface Context {
  accounts: Accounts
  addAccount?: (account: Partial<Account>) => void
  removeAccount?: (accountId: number) => void
  balances: Balances
  addBalance?: (balance: Partial<Balance>) => void
  removeBalance?: (balanceId: number) => void
  transactions: Transactions
  addTransaction?: (transaction: Partial<Transaction>) => void
  removeTransaction?: (transactionId: number) => void
  startDate: Date
  endDate: Date
  changeDate?: (isStartDate: boolean) => (date: Date) => void
  accountBalances: AccountBalance[]
}

const initialContext = {
  accounts: [],
  balances: [],
  transactions: [],
  startDate: new Date(),
  endDate: new Date(),
  accountBalances: [],
}

const appContext = createContext<Context>(initialContext)

const getNextId = (objects: Accounts | Balances | Transactions) =>
  objects
    .map((object) => object.id)
    .sort()
    .pop() + 1

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // const { user } = useAuth()
  const [accounts, setAccounts] = useState(generateAccounts() as Accounts)
  const [balances, setBalances] = useState(generateBalances() as Balances)
  const [transactions, setTransactions] = useState(
    generateTransactions() as Transactions
  )
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const { startDate, endDate } = dateRange
  const [accountBalances, setAccountBalances] = useState([])

  const addAccount = async (accountInfo: Partial<Account>) => {
    // Replace below with a database call
    const newAccount = await Promise.resolve({
      id: getNextId(accounts),
      target_value: 100,
      created_at: new Date().toString(),
      user_id: 1,
      ...accountInfo,
    } as Account)
    // add account to database
    setAccounts([...accounts, newAccount])
  }
  const removeAccount = async (id: number) => {
    // remove account from database
    await Promise.resolve(true)

    setAccounts([
      ...accounts.filter((account) => {
        account.id !== id
      }),
    ])
  }

  const addBalance = async ({ date, amount, account_id }: Partial<Balance>) => {
    // Replace below with a database call
    const newBalance = await Promise.resolve({
      id: getNextId(balances),
      created_at: new Date().toString(),
      date,
      amount,
      account_id,
    } as Balance)
    // add balance to database
    setBalances([...balances, newBalance])
  }
  const removeBalance = async (id: number) => {
    // remove balance from database
    await Promise.resolve(true)

    setBalances([
      ...balances.filter((account) => {
        account.id !== id
      }),
    ])
  }

  const addTransaction = async (transactionInfo: Partial<Transaction>) => {
    // Replace below with a database call
    const newTransaction = await Promise.resolve({
      ...transactionInfo,
      id: getNextId(transactions),
      created_at: new Date().toString(),
    } as Transaction)
    // add transaction to database
    setTransactions([...transactions, newTransaction])
  }
  const removeTransaction = async (id: number) => {
    // remove transaction from database
    await Promise.resolve(true)

    setTransactions([
      ...transactions.filter((account) => {
        account.id !== id
      }),
    ])
  }

  const changeDate = (isStartDate: boolean) => (date: Date) => {
    const { firstDate, secondDate } = putDatesInOrder(
      date,
      isStartDate ? endDate : startDate
    )
    setDateRange({
      startDate: firstDate,
      endDate: secondDate,
    })
  }

  useEffect(() => {
    const newDateArray = eachDayOfInterval({ start: startDate, end: endDate })
    const result = generateDateBalanceArray({
      dates: newDateArray,
      accounts,
      balances,
      transactions,
    })
    setAccountBalances(result)
  }, [startDate, endDate, balances, accounts, transactions])

  return (
    <appContext.Provider
      value={{
        accounts,
        addAccount,
        removeAccount,
        balances,
        addBalance,
        removeBalance,
        transactions,
        addTransaction,
        removeTransaction,
        startDate,
        endDate,
        changeDate,
        accountBalances,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export { appContext, AppContextProvider }
