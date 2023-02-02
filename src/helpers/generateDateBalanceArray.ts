import { isSameDay } from 'date-fns'
import { balances } from '../../public/exampleData'
import { Accounts, Balances, Transactions } from '../../types'
import { shouldTransactionOccur } from './shouldTransactionOccur'

interface DateBalanceElement {
  date: Date
  balances: number[]
}

const generateDateBalanceArray = ({
  dates,
  accounts,
  transactions,
  balances,
}: {
  dates: Date[]
  accounts: Accounts
  balances: Balances
  transactions: Transactions
}): DateBalanceElement[] => {
  const resultFormat = dates.reduce((balanceDateArray, currentDate) => {
    const currentEntry = {
      date: currentDate,
      balances: accounts.map((account, accountIndex) => {
        const recordedAccountBalance = balances.find(
          ({ account_id, date }) =>
            account.id === account_id && isSameDay(new Date(date), currentDate)
        )
        if (recordedAccountBalance) {
          return recordedAccountBalance.amount
        }
        const previousBalance =
          balanceDateArray.length > 0
            ? balanceDateArray[balanceDateArray.length - 1].balances[
                accountIndex
              ]
            : 0
        const changeInBalance = transactions.reduce(
          (
            previousValue,
            { amount, frequency, start_date, from_account, to_account }
          ) => {
            if (
              shouldTransactionOccur({
                frequency,
                currentDate,
                startDate: new Date(start_date),
              })
            ) {
              if (from_account === account.id) {
                return previousValue - amount
              } else if (to_account === account.id) {
                return previousValue + amount
              }
            }
            return previousValue
          },
          0
        )

        return previousBalance + changeInBalance
      }),
    }
    balanceDateArray.push(currentEntry)
    return balanceDateArray
  }, [] as DateBalanceElement[])
  return resultFormat
}

export { generateDateBalanceArray }
