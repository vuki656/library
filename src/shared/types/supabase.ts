export type Json =
  Json[] | boolean | number | string | { [key: string]: Json } | null

export interface Database {
  public: {
    Enums: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Tables: {
      employees: {
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
        }
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
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
  }
}
