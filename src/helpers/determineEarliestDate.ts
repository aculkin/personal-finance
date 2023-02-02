import { min } from 'date-fns'
import { Balances } from '../../types'
const determineEarliestDate = (balances: Balances[]) => {
  let dateArray = balances.map((balance) => new Date(balance.date))
  return min(dateArray)
}

export { determineEarliestDate }
