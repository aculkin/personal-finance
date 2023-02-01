import { subDays } from 'date-fns'
import { transactions, balances, accounts } from '.'

const today = new Date()

const generateBalances = () =>
  balances.map((balance, index) => ({
    ...balance,
    id: index,
    created_at: new Date().toString(),
    date: subDays(today, balance.date).toString(),
  }))

const generateTransactions = () =>
  transactions.map((transaction) => ({
    ...transaction,
    created_at: new Date().toString(),
    start_date: subDays(today, transaction.start_date).toString(),
  }))

const generateAccounts = () =>
  accounts.map((account) => ({
    ...account,
    created_at: new Date().toString(),
  }))

export { generateBalances, generateTransactions, generateAccounts }
