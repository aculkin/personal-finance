import { useState } from "react";

import { Modal } from "..";
import { AccountForm } from "../forms";
import { useAppState } from "../../hooks";

const defaultAccountData = {
	name: "",
	asset: true,
	liquid: true,
};

const NewAccountModal = ({
	isOpen = false,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [accountData, setAccountData] = useState(defaultAccountData);
	const { addAccount } = useAppState();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setAccountData({
			...accountData,
			[name]: name === "name" ? value : !accountData[name],
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		await addAccount(accountData);
		setIsLoading(false);
		setAccountData(defaultAccountData);
		setIsOpen(false);
	};

	const { name, liquid, asset } = accountData;
	return (
		<Modal
			title='New Account'
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			confirmText='Add Account'
		>
			<AccountForm
				handleChange={handleChange}
				name={name}
				asset={asset}
				liquid={liquid}
			/>
		</Modal>
	);
};

export { NewAccountModal };
