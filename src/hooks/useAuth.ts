import { useToast } from "@chakra-ui/react";
import {
	useUser,
	useSupabaseClient,
	useSession,
} from "@supabase/auth-helpers-react";
const useAuth = () => {
	const user = useUser();
	const session = useSession();
	const supabase = useSupabaseClient();
	const errorToast = useToast({
		title: "Error!",
		status: "error",
		duration: 4000,
		isClosable: true,
		position: "top",
	});

	const login = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};

	const signup = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) throw error;
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			console.error(error);
			errorToast({ description: error.message });
		}
	};

	return { user, session, signOut, login, signup };
};

export { useAuth };
