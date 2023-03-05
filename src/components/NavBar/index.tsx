import { Button, Flex, FormLabel } from "@chakra-ui/react";

import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useAppState } from "../../hooks";
import { NewAccountModal, NewBalanceModal, NewTransactionModal } from "../";
import { useState } from "react";

enum ModalOptionsEnum {
	Account = "account",
	Balance = "balance",
	Transaction = "transaction",
}

const NavBar = () => {
	const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
	const [isNewBalanceOpen, setIsNewBalanceOpen] = useState(false);
	const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
	const { startDate, endDate, changeDateRange } = useAppState();

	const dateArray = [];
	if (startDate) {
		dateArray.push(startDate);
	}
	if (endDate) {
		dateArray.push(endDate);
	}

	const openMenu = (name: ModalOptionsEnum) => {
		setIsNewBalanceOpen(name === ModalOptionsEnum.Balance);
		setIsNewTransactionOpen(name === ModalOptionsEnum.Transaction);
		setIsNewAccountOpen(name === ModalOptionsEnum.Account);
	};
	return (
		<Flex
			direction='column'
			width='100%'
			p='1'
			justifyContent='flex-start'
			height='100%'
		>
			<FormLabel mb={0}>Date Range</FormLabel>
			<RangeDatepicker
				name='date picker'
				selectedDates={dateArray}
				onDateChange={changeDateRange}
			/>
			<Flex direction='column' justifyContent='center' my='1'>
				<Button my='1' onClick={() => openMenu(ModalOptionsEnum.Account)}>
					New Account
				</Button>
				<Button my='1' onClick={() => openMenu(ModalOptionsEnum.Balance)}>
					New Balance
				</Button>
				<Button my='1' onClick={() => openMenu(ModalOptionsEnum.Transaction)}>
					New Transaction
				</Button>
			</Flex>
			<NewAccountModal
				isOpen={isNewAccountOpen}
				setIsOpen={setIsNewAccountOpen}
			/>
			<NewBalanceModal
				isOpen={isNewBalanceOpen}
				setIsOpen={setIsNewBalanceOpen}
			/>
			<NewTransactionModal
				isOpen={isNewTransactionOpen}
				setIsOpen={setIsNewTransactionOpen}
			/>
		</Flex>
	);
};

export { NavBar };
