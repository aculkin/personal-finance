import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { AccountsChart } from "../components";
import { AppLayout } from "../layouts";
import Database from "../../types";

import { AppContextProvider } from "../providers";

const Home = (props) => {
	return (
		<AppContextProvider value={props}>
			<AppLayout>
				<AccountsChart />
			</AppLayout>
		</AppContextProvider>
	);
};

export const getServerSideProps = async (ctx) => {
	const supabaseServerClient = createServerSupabaseClient<Database>(ctx);
	const {
		data: { session },
	} = await supabaseServerClient.auth.getSession();
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const [
		{ data: accountsData },
		{ data: balancesData },
		{ data: transactionsData },
	] = await Promise.all([
		supabaseServerClient.from("accounts").select("*"),
		supabaseServerClient.from("balances").select("*"),
		supabaseServerClient.from("transactions").select("*"),
	]);
	return {
		props: {
			transactions: transactionsData,
			balances: balancesData,
			accounts: accountsData,
			session,
			user: session.user,
		},
	};
};

export default Home;
