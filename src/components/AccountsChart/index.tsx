import React from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Text,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useAppState } from "../../hooks";

const AccountsChart = () => {
	const { accounts, accountBalances, balances, transactions } = useAppState();

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
							<Td>{format(date, "PP")}</Td>
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

export { AccountsChart };
