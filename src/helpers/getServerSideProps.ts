import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Database from "../../types";

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

export default getServerSideProps;
