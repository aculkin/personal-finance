import type { Database } from "./supabase";

export type Accounts = Database["public"]["Tables"]["accounts"]["Row"][];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type AddAccount = Database["public"]["Tables"]["accounts"]["Insert"];
export type EditAccount = Database["public"]["Tables"]["accounts"]["Update"];
export type Balances = Database["public"]["Tables"]["balances"]["Row"][];
export type Balance = Database["public"]["Tables"]["balances"]["Row"];
export type AddBalance = Database["public"]["Tables"]["balances"]["Insert"];
export type EditBalance = Database["public"]["Tables"]["balances"]["Update"];
export type Transactions =
	Database["public"]["Tables"]["transactions"]["Row"][];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type AddTransaction =
	Database["public"]["Tables"]["transactions"]["Insert"];
export type EditTransaction =
	Database["public"]["Tables"]["transactions"]["Update"];
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"][];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default Database;
