import { useState } from "react";

import { Modal } from "..";
import { TransactionForm } from "../forms";
import { useAppState } from "../../hooks";

const defaultTransactionData = {
	name: "",
	frequency: "",
	interestRate: null,
	amount: null,
	payoffToAccount: false,
	priority: 1,
	fromAccountId: null,
	toAccountId: null,
	startDate: new Date(),
};

const NewTransactionModal = ({
	isOpen = false,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [transactionData, setTransactionData] = useState(
		defaultTransactionData
	);
	const { addTransaction } = useAppState();

	const {
		name,
		frequency,
		interestRate,
		amount,
		payoffToAccount,
		priority,
		fromAccountId,
		toAccountId,
		startDate,
	} = transactionData;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setTransactionData({
			...transactionData,
			[name]: name == "startDate" ? new Date(value) : value,
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		await addTransaction({
			name,
			frequency,
			interest_rate: parseFloat(interestRate),
			amount: parseFloat(amount),
			payoff_to_account: payoffToAccount,
			priority,
			from_account: parseInt(fromAccountId),
			to_account: parseInt(toAccountId),
			start_date: startDate.toString(),
		});
		setTransactionData(defaultTransactionData);
		setIsLoading(false);
		setIsOpen(false);
	};

	return (
		<Modal
			title='New Transaction'
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			confirmText='Add Transaction'
		>
			<TransactionForm
				name={name}
				frequency={frequency}
				interestRate={interestRate}
				amount={amount}
				payoffToAccount={payoffToAccount}
				priority={priority}
				fromAccountId={fromAccountId}
				toAccountId={toAccountId}
				startDate={startDate}
				handleChange={handleChange}
			/>
		</Modal>
	);
};

export { NewTransactionModal };
