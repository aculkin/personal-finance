import { getDay, getDate, getDayOfYear, isSameDay } from 'date-fns'

const shouldTransactionOccur = ({
  frequency,
  currentDate,
  startDate,
}: {
  frequency: string
  currentDate: Date
  startDate?: Date
}) => {
  switch (frequency) {
    case 'daily':
      return true
    case 'weekly': {
      const startDayOfWeek = getDay(startDate)
      const currentDayOfWeek = getDay(currentDate)
      return startDayOfWeek === currentDayOfWeek
    }
    case 'bi-weekly': {
      // fix this to be bi-weekly instead of weekly
      const startDayOfWeek = getDay(startDate)
      const currentDayOfWeek = getDay(currentDate)
      return startDayOfWeek === currentDayOfWeek
    }
    case 'semi-monthly': {
      // fix this to be semi-monthly instead of monthly
      const startDayOfMonth = getDate(startDate)
      const currentDayOfMonth = getDate(currentDate)
      return startDayOfMonth === currentDayOfMonth
    }
    case 'monthly':
      const startDayOfMonth = getDate(startDate)
      const currentDayOfMonth = getDate(currentDate)
      return startDayOfMonth === currentDayOfMonth
    case 'quarterly': {
      // fix this to be quarterly instead of yearly
      const startDayOfYear = getDayOfYear(startDate)
      const currentDayOfYear = getDayOfYear(currentDate)
      return startDayOfYear === currentDayOfYear
    }
    case 'yearly': {
      const startDayOfYear = getDayOfYear(startDate)
      const currentDayOfYear = getDayOfYear(currentDate)
      return startDayOfYear === currentDayOfYear
    }
    default:
      return isSameDay(startDate, currentDate)
  }
}

export { shouldTransactionOccur }
