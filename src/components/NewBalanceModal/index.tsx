import { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

import { Modal } from "..";
import { BalanceForm } from "../forms";
import { useAppState } from "../../hooks";

const defaultBalanceData = {
	date: new Date(),
	amount: null,
	accountId: null,
};

const NewBalanceModal = ({
	isOpen = false,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [balanceData, setBalanceData] = useState(defaultBalanceData);
	const { addBalance } = useAppState();

	const { date, amount, accountId } = balanceData;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setBalanceData({
			...balanceData,
			[name]: name == "date" ? new Date(value) : parseInt(value),
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		await addBalance({
			date: date.toString(),
			amount,
			account_id: balanceData.accountId,
		});
		setIsLoading(false);
		setBalanceData(defaultBalanceData);
		setIsOpen(false);
	};

	return (
		<Modal
			title='New Balance'
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			confirmText='Add Balance'
		>
			<BalanceForm
				date={date}
				amount={amount}
				accountId={accountId}
				handleChange={handleChange}
			/>
		</Modal>
	);
};

export { NewBalanceModal };
