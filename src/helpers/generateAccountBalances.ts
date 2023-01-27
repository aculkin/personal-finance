import { isSameDay } from 'date-fns'
import { shouldTransactionOccur } from './shouldTransactionOccur'

interface Account {
  id: number
  name: string
  asset: boolean
  userId: number
  liquid: boolean
  targetValue: number
}

interface Transaction {
  id: number
  name: string
  frequency: string
  interestRate?: number
  weekday?: number
  monthDay?: number
  amount?: number
  payoff?: boolean
  priority: number
  fromAccount: number
  toAccount: number
  startDate: Date
}

interface Balance {
  id: number
  date: Date
  amount: number
  accountId: number
}

const generateAccountBalances = ({
  dates,
  accounts,
  balances,
  transactions,
}: {
  dates: Date[]
  accounts: Account[]
  balances: Balance[]
  transactions: Transaction[]
}) => {
  const resultAccounts = {}
  accounts.forEach((account) => {
    resultAccounts[account.id] = new Array(dates.length)
  })
  dates.forEach((date, dateIndex) => {
    accounts.forEach((account, accountIndex) => {
      const previousBalance = resultAccounts[account.id][dateIndex - 1]
      let resultingBalance = previousBalance
      transactions.forEach((transaction, transactionIndex) => {
        const transactionShouldOccur = shouldTransactionOccur({
          frequency: transaction.frequency,
          currentDate: date,
          startDate: transaction.startDate,
        })
        if (transactionShouldOccur) {
          if (transaction.fromAccount === account.id) {
            resultingBalance = resultingBalance - transaction.amount
          } else if (transaction.toAccount === account.id) {
            resultingBalance = resultingBalance + transaction.amount
          }
        }
      })
      balances.forEach((balance, balanceIndex) => {
        if (isSameDay(balance.date, date) && account.id === balance.accountId) {
          resultingBalance = balance.amount
        }
      })
      console.log('account', account.id, 'date', date, resultingBalance)
      resultAccounts[account.id][dateIndex] = resultingBalance
    })
  })
  return resultAccounts
}

export { generateAccountBalances }
