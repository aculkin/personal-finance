import { isSameDay } from 'date-fns'
import { shouldTransactionOccur } from './shouldTransactionOccur'

import { Accounts, Transactions, Balances } from '../../types'

const generateAccountBalances = ({
  dates,
  accounts,
  balances,
  transactions,
}: {
  dates: Date[]
  accounts: Accounts[]
  balances: Balances[]
  transactions: Transactions[]
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
          startDate: new Date(transaction.start_date),
        })
        if (transactionShouldOccur) {
          if (transaction.from_account === account.id) {
            resultingBalance = resultingBalance - transaction.amount
          } else if (transaction.to_account === account.id) {
            resultingBalance = resultingBalance + transaction.amount
          }
        }
      })
      balances.forEach((balance, balanceIndex) => {
        if (
          isSameDay(new Date(balance.date), date) &&
          account.id === balance.account_id
        ) {
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
