import type { Database } from './supabase'

export type Accounts = Database['public']['Tables']['accounts']['Row']
export type Balances = Database['public']['Tables']['balances']['Row']
export type Transactions = Database['public']['Tables']['transactions']['Row']
export type Profiles = Database['public']['Tables']['profiles']['Row']

export default Database
