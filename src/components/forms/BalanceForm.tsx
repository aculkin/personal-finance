import {
	FormControl,
	NumberInput,
	NumberInputField,
	FormLabel,
	InputGroup,
	InputLeftAddon,
	Select,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { useAppState } from "../../hooks";

interface BalanceForm {
	date?: Date;
	amount?: number;
	accountId?: number;
	handleChange: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => void;
}

const BalanceForm = ({
	date,
	amount,
	accountId,
	handleChange,
}: BalanceForm) => {
	const { accounts } = useAppState();
	const accountList = [{ id: null, name: "N/A" }, ...accounts];
	return (
		<FormControl alignItems='center'>
			<FormLabel mb='0'>Account</FormLabel>
			<Select name='accountId' value={accountId || ""} onChange={handleChange}>
				{accountList.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</Select>
			<FormLabel mb='0'>Amount:</FormLabel>
			<InputGroup>
				<InputLeftAddon children='$' />
				<NumberInput width='100%'>
					<NumberInputField
						placeholder='500.00'
						value={amount}
						name='amount'
						onChange={handleChange}
					/>
				</NumberInput>
			</InputGroup>
			<FormLabel mb='0'>Balance Date:</FormLabel>
			<SingleDatepicker
				date={date}
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

export { BalanceForm };
