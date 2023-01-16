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
      authors: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
        }
      }
      employees: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
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
