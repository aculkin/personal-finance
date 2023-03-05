import { format } from "date-fns";
import {
	FormControl,
	Select,
	NumberInput,
	NumberInputField,
	Input,
	Switch,
	FormLabel,
	InputGroup,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { useAppState } from "../../hooks";

const options = {};

interface TransactionForm {
	name?: string;
	frequency?: string;
	interestRate?: number;
	amount?: number;
	payoffToAccount?: boolean;
	priority?: number;
	fromAccountId?: number;
	toAccountId?: number;
	startDate?: Date;
	handleChange: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => void;
}

const TransactionForm = ({
	name,
	frequency,
	interestRate,
	amount,
	payoffToAccount,
	priority,
	fromAccountId,
	toAccountId,
	startDate = new Date(),
	handleChange,
}: TransactionForm) => {
	const { accounts } = useAppState();
	const accountList = [{ id: null, name: null }, ...accounts];
	return (
		<FormControl alignItems='center'>
			<FormLabel mb='0'>Transaction Name:</FormLabel>
			<Input value={name} onChange={handleChange} name='name' />
			<FormLabel mb='0'>Frequency</FormLabel>
			<Select value={frequency} onChange={handleChange}>
				<option value='daily'>Daily</option>
				<option value='weekly'>Weekly</option>
				<option value='biWeekly'>Bi-Weekly</option>
				<option value='semiMonthly'>Semi-Monthly</option>
				<option value='monthly'>Monthly</option>
				<option value='daily'>Quarterly</option>
				<option value='daily'>Yearly</option>
			</Select>
			<FormLabel mb='0'>Interest Rate:</FormLabel>
			<NumberInput>
				<NumberInputField
					value={interestRate}
					onChange={handleChange}
					name='interestRate'
				/>
			</NumberInput>
			<FormLabel mb='0'>Amount:</FormLabel>
			<NumberInput>
				<NumberInputField
					value={amount}
					onChange={handleChange}
					name='amount'
				/>
			</NumberInput>
			<FormLabel mb='0'>Payoff the account:</FormLabel>
			<Switch checked={payoffToAccount} name='payoffToAccount' />
			<FormLabel mb='0'>Priority:</FormLabel>
			<NumberInput>
				<NumberInputField
					value={priority}
					onChange={handleChange}
					name='priority'
				/>
			</NumberInput>
			<FormLabel mb='0'>"From" Account Id</FormLabel>
			<Select
				name='fromAccountId'
				value={fromAccountId || ""}
				onChange={handleChange}
			>
				{accountList.map(({ id, name }) => (
					<option key={id} value={id}>
						{name || "None (external cashflow)"}
					</option>
				))}
			</Select>
			<FormLabel mb='0'>"To" Account Id</FormLabel>
			<Select
				name='toAccountId'
				value={toAccountId || ""}
				onChange={handleChange}
			>
				{accountList.map(({ id, name }) => (
					<option key={id} value={id}>
						{name || "None (external payment)"}
					</option>
				))}
			</Select>
			<FormLabel mb='0'>Start Date:</FormLabel>
			<SingleDatepicker
				date={startDate}
				name='date'
				onDateChange={(newDate: Date) =>
					handleChange({
						target: {
							name: "date",
							// @ts-expect-error
							value: newDate,
						},
					})
				}
			/>
		</FormControl>
	);
};

export { TransactionForm };
