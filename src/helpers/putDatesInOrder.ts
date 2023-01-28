import { compareAsc } from 'date-fns'

const putDatesInOrder = (date1: Date, date2: Date) => {
  if (compareAsc(date1, date2) < 0) {
    return {
      firstDate: date1,
      secondDate: date2,
    }
  }
  return {
    firstDate: date2,
    secondDate: date1,
  }
}

export { putDatesInOrder }
