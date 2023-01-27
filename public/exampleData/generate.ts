import { subDays } from 'date-fns'
import { transactions, balances } from '.'
const today = new Date()

const generateBalances = () =>
  balances.map((balance, index) => ({
    ...balance,
    id: index,
    date: subDays(today, balance.date),
  }))

const generateTransactions = () =>
  transactions.map((transaction) => ({
    ...transaction,
    startDate: subDays(today, transaction.startDate),
  }))

export { generateBalances, generateTransactions }
