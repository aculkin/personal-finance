export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          asset: boolean | null
          created_at: string | null
          id: number
          liquid: boolean | null
          name: string | null
          target_value: number | null
          user_id: string | null
        }
        Insert: {
          asset?: boolean | null
          created_at?: string | null
          id?: number
          liquid?: boolean | null
          name?: string | null
          target_value?: number | null
          user_id?: string | null
        }
        Update: {
          asset?: boolean | null
          created_at?: string | null
          id?: number
          liquid?: boolean | null
          name?: string | null
          target_value?: number | null
          user_id?: string | null
        }
      }
      balances: {
        Row: {
          account_id: number
          amount: number
          created_at: string | null
          date: string
          id: number
        }
        Insert: {
          account_id: number
          amount?: number
          created_at?: string | null
          date?: string
          id?: number
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string | null
          date?: string
          id?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      transactions: {
        Row: {
          amount: number | null
          created_at: string | null
          frequency: string | null
          from_account: number | null
          id: number
          interest_rate: number | null
          name: string | null
          payoff_to_account: boolean
          priority: number | null
          start_date: string | null
          to_account: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          frequency?: string | null
          from_account?: number | null
          id?: number
          interest_rate?: number | null
          name?: string | null
          payoff_to_account?: boolean
          priority?: number | null
          start_date?: string | null
          to_account?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          frequency?: string | null
          from_account?: number | null
          id?: number
          interest_rate?: number | null
          name?: string | null
          payoff_to_account?: boolean
          priority?: number | null
          start_date?: string | null
          to_account?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
