import React from "react";

import { BalancesChart } from "../components";
import { AppLayout } from "../layouts";
import { AppContextProvider } from "../providers";
import { getServerSideProps } from "../helpers";

const Balances = (props) => {
	return (
		<AppContextProvider value={props}>
			<AppLayout>
				<BalancesChart />
			</AppLayout>
		</AppContextProvider>
	);
};

export { getServerSideProps };

export default Balances;
