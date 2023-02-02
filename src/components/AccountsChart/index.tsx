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
import { format } from 'date-fns'
import { useAppState } from '../../hooks'

const AccountsChart = () => {
  const { accounts, accountBalances } = useAppState()

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            {accounts.map(({ name, id }) => (
              <Th key={name}>
                {name} (id: {id})
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {accountBalances.map(({ date, balances }, dateIndex) => (
            <Tr key={dateIndex}>
              <Td>{format(date, 'PP')}</Td>
              {balances.map((balance, index) => {
                // const value = accountArrays[account.id][dateIndex]
                return (
                  <Td alignItems="right" key={index}>
                    ${balance || 0}.00
                  </Td>
                )
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export { AccountsChart }
