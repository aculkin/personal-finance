import Head from "next/head";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({
	Component,
	pageProps,
}: AppProps<{ initialSession: Session }>) => {
	const [supabase] = useState(() => createBrowserSupabaseClient());
	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<ChakraProvider>
				<Head>
					<title>Personal Finance App</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionContextProvider>
	);
};

export default App;
