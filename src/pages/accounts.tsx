import React from "react";

import { AccountsChart } from "../components";
import { AppLayout } from "../layouts";
import { AppContextProvider } from "../providers";
import { getServerSideProps } from "../helpers";

const Accounts = (props) => {
	return (
		<AppContextProvider value={props}>
			<AppLayout>
				<AccountsChart />
			</AppLayout>
		</AppContextProvider>
	);
};

export { getServerSideProps };

export default Accounts;
