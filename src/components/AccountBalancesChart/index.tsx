import React from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from "@chakra-ui/react";

import { currencyFormatter, monthDayYear } from "../../helpers";
import { useAppState } from "../../hooks";

const AccountBalancesChart = () => {
	const { accounts, accountBalances } = useAppState();

	return (
		<TableContainer>
			<Table size='sm'>
				<Thead>
					<Tr>
						<Th>Date</Th>
						{accounts.map(({ name, id }) => (
							<Th key={name} justifyContent='center'>
								{name} (id: {id})
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{accountBalances.map(({ date, balances }, dateIndex) => (
						<Tr key={dateIndex}>
							<Td>{monthDayYear(date)}</Td>
							{balances.map((balance, index) => {
								return (
									<Td alignItems='right' key={index} isNumeric>
										{currencyFormatter(balance || 0)}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export { AccountBalancesChart };
