import { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

import { NewBalanceModal } from "../NewBalanceModal";

const NewBalanceButton = (props: ButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setIsOpen(true)} {...props}>
				New Balance
			</Button>
			<NewBalanceModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

export { NewBalanceButton };
