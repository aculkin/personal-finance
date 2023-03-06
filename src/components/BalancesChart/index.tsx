import React, { useState, useEffect } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	TableCaption,
	Select,
	Button,
	Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { addDays, subDays } from "date-fns";

import { currencyFormatter, timeAgo, monthDayYear } from "../../helpers";
import { useAppState } from "../../hooks";

const DATE_FORMAT = "MMM do, yyyy";

const tableHeaders = {
	date: "Balance Date",
	amount: "Amount",
	edit: "Edit",
	delete: "Delete",
	created_at: "Created",
};

const BalancesChart = () => {
	const { balances, accounts } = useAppState();
	const today = new Date();
	const [dates, setDates] = useState([subDays(today, 7), addDays(today, 7)]);

	const [currentAccountId, setCurrentAccountId] = React.useState(
		accounts[0]?.id
	);
	const [currentBalances, setCurrentBalances] = useState([]);

	const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentAccountId(parseInt(event.target.value));
	};

	useEffect(() => {
		setCurrentBalances(
			balances
				.filter(({ account_id }) => account_id === currentAccountId)
				.sort(
					({ date: date1 }, { date: date2 }) =>
						new Date(date1).getUTCSeconds() - new Date(date2).getUTCSeconds()
				)
		);
	}, [currentAccountId, balances]);

	return (
		<>
			<Flex direction='row'>
				<Select
					value={currentAccountId || 0}
					onChange={handleAccountChange}
					width='50%'
					mr='3'
				>
					{accounts.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</Select>
				<RangeDatepicker selectedDates={dates} onDateChange={setDates} />
			</Flex>
			<TableContainer>
				<Table size='sm'>
					{currentBalances.length === 0 && (
						<TableCaption>
							No balances to display for{" "}
							{accounts.find(({ id }) => id === currentAccountId).name}!
						</TableCaption>
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
						{currentBalances.map(({ id, date, amount, created_at }) => {
							return (
								<Tr key={id}>
									<Td>{monthDayYear(date)}</Td>
									<Td>{currencyFormatter(amount)}</Td>

									<Td>
										<Button
											leftIcon={<EditIcon />}
											size='xs'
											colorScheme='gray'
										>
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
									<Td>{timeAgo(created_at)} ago</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export { BalancesChart };
