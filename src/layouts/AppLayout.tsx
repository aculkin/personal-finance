import {
	Grid,
	GridItem,
	useColorModeValue,
	Tabs,
	TabList,
	Tab,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const getTabIndex = (pathname) => {
	switch (pathname) {
		case "/accounts":
			return 1;
		case "/balances":
			return 2;
		case "/transactions":
			return 3;
		default:
			return 0;
	}
};

const AppLayout = ({ children }: { children: ReactNode }) => {
	const formBackground = useColorModeValue("gray.100", "gray.700");
	const { pathname } = useRouter();
	const tabIndex = getTabIndex(pathname);
	return (
		<Grid
			templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
			gridTemplateRows={"50px 1fr 30px"}
			gridTemplateColumns={"250px 1fr"}
			h='100vh'
			w='100vw'
			background={formBackground}
		>
			<GridItem area={"header"}>
				<Header />
			</GridItem>
			<GridItem area={"nav"}>
				<NavBar />
			</GridItem>
			<GridItem area={"main"} overflow='scroll' padding='10px'>
				<Tabs variant='enclosed' index={tabIndex}>
					<TabList>
						<Tab as={NextLink} href='/'>
							Account Balances chart
						</Tab>
						<Tab as={NextLink} href='/accounts'>
							Accounts
						</Tab>
						<Tab as={NextLink} href='/balances'>
							Balances
						</Tab>
						<Tab as={NextLink} href='/transactions'>
							Transactions
						</Tab>
					</TabList>
					{children}
				</Tabs>
			</GridItem>
			<GridItem area={"footer"}>
				<Footer />
			</GridItem>
		</Grid>
	);
};

export { AppLayout };
