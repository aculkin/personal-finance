import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";
import { eachDayOfInterval, addDays, format } from "date-fns";
import { useToast } from "@chakra-ui/react";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import type {
	Accounts,
	AddAccount,
	EditAccount,
	Balances,
	AddBalance,
	EditBalance,
	Transactions,
	AddTransaction,
	EditTransaction,
} from "../../types";
import Database from "../../types";
import { generateDateBalanceArray } from "../helpers";

const SUPABASE_DATE_FORMAT = "yyyy-MM-dd";

export interface AccountBalance {
	date: Date;
	balances: number[];
}

interface Context {
	accounts: Accounts;
	addAccount?: (account: AddAccount) => Promise<void>;
	editAccount?: (account: EditAccount) => Promise<void>;
	removeAccount?: (accountId: number) => Promise<void>;
	balances: Balances;
	addBalance?: (balance: AddBalance) => Promise<void>;
	editBalance?: (balance: EditBalance) => Promise<void>;
	removeBalance?: (balanceId: number) => Promise<void>;
	transactions: Transactions;
	addTransaction?: (transaction: AddTransaction) => Promise<void>;
	editTransaction?: (transaction: EditTransaction) => Promise<void>;
	removeTransaction?: (transactionId: number) => Promise<void>;
	session?: Session;
	startDate: Date;
	endDate: Date;
	changeDateRange?: ([startDate, endDate]: [Date, Date]) => void;
	accountBalances: AccountBalance[];
}

const initialContext = {
	accounts: [],
	balances: [],
	transactions: [],
	session: null,
	user: {},
	startDate: new Date(),
	endDate: addDays(new Date(), 7),
	accountBalances: [],
};

const appContext = createContext<Context>(initialContext);

const AppContextProvider = ({
	value,
	children,
}: {
	value: any;
	children: ReactNode;
}) => {
	const {
		accounts: initialAccounts,
		balances: initialBalances,
		session: initialSession,
		transactions: initialTransactions,
	} = value;
	const supabaseClient = useSupabaseClient<Database>();
	const user = useUser();
	const [accounts, setAccounts] = useState(initialAccounts as Accounts);
	const [balances, setBalances] = useState(initialBalances as Balances);
	const [transactions, setTransactions] = useState(
		initialTransactions as Transactions
	);
	const [session] = useState(initialSession);
	const [selectedDates, setSelectedDates] = useState<Date[]>([
		new Date(),
		addDays(new Date(), 7),
	]);
	const [accountBalances, setAccountBalances] = useState([]);
	const errorToast = useToast({
		title: "Error:",
		status: "error",
		duration: 4000,
		isClosable: true,
		position: "top",
	});

	const addAccount = async (accountInfo: AddAccount) => {
		try {
			const { data, error } = await supabaseClient
				.from("accounts")
				.insert({ ...accountInfo, user_id: user.id })
				.select();
			if (error) {
				throw error;
			}
			const newAccount = data[0];
			if (newAccount) {
				setAccounts([...accounts, newAccount]);
			}
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};
	const removeAccount = async (id: number) => {
		try {
			await supabaseClient.from("accounts").delete().eq("id", id);
			setAccounts([
				...accounts.filter(({ id: accountId }) => {
					accountId !== id;
				}),
			]);
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};
	const editAccount = async (accountInfo: EditAccount) => {
		try {
			const { data } = await supabaseClient
				.from("accounts")
				.update(accountInfo)
				.eq("id", accountInfo.id)
				.select();
			const editedAccount = data[0];
			setAccounts([
				...accounts.map((account) => {
					if (account.id === accountInfo.id) {
						return editedAccount;
					} else {
						return account;
					}
				}),
			]);
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};

	const addBalance = async (balanceInfo: AddBalance) => {
		try {
			const { data, error } = await supabaseClient
				.from("balances")
				.insert({
					...balanceInfo,
					user_id: user.id,
					date: format(new Date(balanceInfo.date), SUPABASE_DATE_FORMAT),
				})
				.select();
			if (error) {
				throw error;
			}
			const newBalance = data[0];
			if (newBalance) {
				setBalances([...balances, newBalance]);
			}
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};
	const removeBalance = async (id: number) => {
		try {
			await supabaseClient.from("balances").delete().eq("id", id);
			setBalances([
				...balances.filter(({ id: balanceId }) => {
					balanceId !== id;
				}),
			]);
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};
	const editBalance = async (balanceInfo: EditBalance) => {
		try {
			const { data } = await supabaseClient
				.from("balances")
				.update(balanceInfo)
				.eq("id", balanceInfo.id)
				.select();
			const editedBalance = data[0];
			setBalances([
				...balances.map((balance) => {
					if (balance.id === balanceInfo.id) {
						return editedBalance;
					} else {
						return balance;
					}
				}),
			]);
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};

	const addTransaction = async (transactionInfo: AddTransaction) => {
		try {
			const { data, error } = await supabaseClient
				.from("transactions")
				.insert({
					...transactionInfo,
					user_id: user.id,
					start_date: format(
						new Date(transactionInfo.start_date),
						SUPABASE_DATE_FORMAT
					),
				})
				.select();
			if (error) {
				throw error;
			}
			const newTransaction = data[0];
			if (newTransaction) {
				setTransactions([...transactions, newTransaction]);
			}
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};
	const removeTransaction = async (id: number) => {
		try {
			await supabaseClient.from("transactions").delete().eq("id", id);
			setTransactions([
				...transactions.filter(({ id: transactionId }) => {
					transactionId !== id;
				}),
			]);
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};
	const editTransaction = async (transactionInfo: EditTransaction) => {
		try {
			const { data } = await supabaseClient

				.from("transactions")
				.update(transactionInfo)
				.eq("id", transactionInfo.id)
				.select();
			const editedTransaction = data[0];
			setTransactions([
				...transactions.map((transaction) => {
					if (transaction.id === transactionInfo.id) {
						return editedTransaction;
					} else {
						return transaction;
					}
				}),
			]);
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};

	const changeDateRange = (dates: Date[]) => {
		setSelectedDates(dates);
	};

	useEffect(() => {
		const startDate = selectedDates[0];
		const endDate = selectedDates[1];
		if (startDate && endDate) {
			const newDateArray = eachDayOfInterval({
				start: startDate,
				end: endDate,
			});
			const result = generateDateBalanceArray({
				dates: newDateArray,
				accounts,
				balances,
				transactions,
			});
			setAccountBalances(result);
		}
	}, [balances, accounts, transactions, selectedDates]);

	return (
		<appContext.Provider
			value={{
				accounts,
				addAccount,
				removeAccount,
				editAccount,
				balances,
				addBalance,
				removeBalance,
				editBalance,
				transactions,
				addTransaction,
				removeTransaction,
				editTransaction,
				session,
				startDate: selectedDates[0],
				endDate: selectedDates[1],
				changeDateRange,
				accountBalances,
			}}
		>
			{children}
		</appContext.Provider>
	);
};

export { appContext, AppContextProvider };
