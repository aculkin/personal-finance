import { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

import { NewAccountModal } from "../NewAccountModal";

const NewAccountButton = (props: ButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setIsOpen(true)} {...props}>
				New Account
			</Button>
			<NewAccountModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

export { NewAccountButton };
