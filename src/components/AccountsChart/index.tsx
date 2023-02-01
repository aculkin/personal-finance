import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { format, eachDayOfInterval } from 'date-fns'
import { generateAccountBalances } from '../../helpers'
import { useAppState } from '../../hooks'

const AccountsChart = ({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}) => {
  const { accounts, balances, transactions } = useAppState()
  const [dateArray, setDateArray] = useState([])
  const [accountArrays, setAccountArrays] = useState({})

  useEffect(() => {
    const newDateArray = eachDayOfInterval({ start: startDate, end: endDate })
    setDateArray(newDateArray)
    const result = generateAccountBalances({
      dates: newDateArray,
      accounts,
      balances,
      transactions,
    })
    setAccountArrays(result)
    console.log('result', result)
  }, [startDate, endDate])

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            {accounts.map(({ name }) => (
              <Th key={name}>{name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {dateArray.map((date, dateIndex) => (
            <Tr>
              <Td>{format(date, 'PP')}</Td>
              {accounts.map((account) => {
                const value = accountArrays[account.id][dateIndex]
                return <Td alignItems="right">${value || 0}.00</Td>
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export { AccountsChart }
