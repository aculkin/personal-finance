import React from "react";

import { TransactionsChart } from "../components";
import { AppLayout } from "../layouts";
import { AppContextProvider } from "../providers";
import { getServerSideProps } from "../helpers";

const Transactions = (props) => {
	return (
		<AppContextProvider value={props}>
			<AppLayout>
				<TransactionsChart />
			</AppLayout>
		</AppContextProvider>
	);
};

export { getServerSideProps };

export default Transactions;
