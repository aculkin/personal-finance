import React from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	TableCaption,
	Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { format, formatDistance } from "date-fns";

import { useAppState } from "../../hooks";
import { currencyFormatter } from "../../helpers/currencyFormatter";

const tableHeaders = {
	name: "Name",
	frequency: "Frequency",
	amount: "Amount",
	payoff_to_account: "Payoff to Account?",
	priority: "Priority",
	description: "Description",
	start_date: "Start Date",
	interest_rate: "Interest Rate",
	next_occurance: "Next Occurance",
	created_at: "Created At",
	edit: "Edit",
	delete: "Delete",
};

const TransactionsChart = () => {
	const { transactions, accounts } = useAppState();
	const getDescription = (toAccountId: number, fromAccountId: number) => {
		if (toAccountId && fromAccountId) {
			return `Transfer from ${
				accounts.find(({ id }) => id === fromAccountId)?.name
			} to ${accounts.find(({ id }) => id === toAccountId)?.name}`;
		} else if (toAccountId) {
			return `Deposit to ${
				accounts.find(({ id }) => id === toAccountId)?.name
			}`;
		} else if (fromAccountId) {
			return `Payment/Withdrawal from ${
				accounts.find(({ id }) => id === fromAccountId)?.name
			}`;
		} else {
			("No description");
		}
	};

	return (
		<TableContainer>
			<Table size='sm'>
				{transactions.length === 0 && (
					<TableCaption>No balances to display</TableCaption>
				)}
				<Thead>
					<Tr>
						{Object.keys(tableHeaders).map((headerText) => (
							<Th key={headerText} justifyContent='center'>
								{tableHeaders[headerText]}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{transactions.map(
						({
							id,
							name,
							frequency,
							amount,
							payoff_to_account,
							priority,
							from_account,
							to_account,
							start_date,
							interest_rate,
							created_at,
						}) => (
							<Tr key={id}>
								<Td>{name}</Td>
								<Td>{frequency}</Td>
								<Td>{currencyFormatter(amount)}</Td>
								<Td>{payoff_to_account ? "Payoff" : <i>no payoff</i>}</Td>
								<Td>{priority ? priority : <i>none</i>}</Td>
								<Td>{getDescription(to_account, from_account)}</Td>
								<Td>{start_date}</Td>
								<Td>{interest_rate}</Td>
								<Td>{formatDistance(new Date(), new Date(created_at))}</Td>
								<Td>
									<Button leftIcon={<EditIcon />} size='xs' colorScheme='gray'>
										Edit
									</Button>
								</Td>
								<Td>
									<Button
										// onClick={() => handleDelete(id)}
										leftIcon={<DeleteIcon />}
										size='xs'
										colorScheme='red'
									>
										Delete
									</Button>
								</Td>
							</Tr>
						)
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export { TransactionsChart };
