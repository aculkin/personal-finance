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

import { currencyFormatter, timeAgo } from "../../helpers";
import { useAppState } from "../../hooks";

const tableHeaders = {
	name: "Name",
	asset: "Asset?",
	liquid: "Liquid?",
	target_value: "Target Value",
	created_at: "Created",
	edit: "Edit",
	delete: "Delete",
};

const AccountsChart = () => {
	const { accounts, removeAccount } = useAppState();

	const handleDelete = async (id: number) => {
		await removeAccount(id);
	};

	return (
		<TableContainer>
			<Table size='sm'>
				{accounts.length === 0 && (
					<TableCaption>No accounts to display!</TableCaption>
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
					{accounts.map(
						({ id, name, created_at, asset, liquid, target_value }) => (
							<Tr key={id}>
								<Td>{name}</Td>
								<Td>{asset ? "Asset" : "Liability"}</Td>
								<Td>{liquid ? "Liquid" : "Not liquid"}</Td>
								<Td>{currencyFormatter(target_value)}</Td>
								<Td>{timeAgo(created_at)}</Td>
								<Td>
									<Button leftIcon={<EditIcon />} size='xs' colorScheme='gray'>
										Edit
									</Button>
								</Td>
								<Td>
									<Button
										onClick={() => handleDelete(id)}
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

export { AccountsChart };
