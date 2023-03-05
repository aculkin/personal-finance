import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const AppLayout = ({ children }: { children: ReactNode }) => {
	const formBackground = useColorModeValue("gray.100", "gray.700");
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
			<GridItem area={"main"} overflow='scroll'>
				{children}
			</GridItem>
			<GridItem area={"footer"}>
				<Footer />
			</GridItem>
		</Grid>
	);
};

export { AppLayout };
