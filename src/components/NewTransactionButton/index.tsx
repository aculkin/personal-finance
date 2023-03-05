import { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

import { NewTransactionModal } from "../NewTransactionModal";

const NewTransactionButton = (props: ButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setIsOpen(true)} {...props}>
				New Transaction
			</Button>
			<NewTransactionModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

export { NewTransactionButton };
