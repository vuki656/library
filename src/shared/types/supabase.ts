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
          firstName: string
          id: string
          lastName: string
        }
        Insert: {
          firstName: string
          id?: string
          lastName: string
        }
        Update: {
          firstName?: string
          id?: string
          lastName?: string
        }
      }
      books: {
        Row: {
          authorFk: string
          borrowedByMemberFk: string | null
          id: string
          name: string
          pageCount: number
          releaseDate: string
        }
        Insert: {
          authorFk: string
          borrowedByMemberFk?: string | null
          id?: string
          name: string
          pageCount: number
          releaseDate: string
        }
        Update: {
          authorFk?: string
          borrowedByMemberFk?: string | null
          id?: string
          name?: string
          pageCount?: number
          releaseDate?: string
        }
      }
      employees: {
        Row: {
          email: string
          firstName: string
          id: string
          lastName: string
        }
        Insert: {
          email: string
          firstName: string
          id?: string
          lastName: string
        }
        Update: {
          email?: string
          firstName?: string
          id?: string
          lastName?: string
        }
      }
      members: {
        Row: {
          address: string
          email: string
          firstName: string
          id: string
          lastName: string
          memberSince: string
          phoneNumber: string
        }
        Insert: {
          address: string
          email: string
          firstName: string
          id?: string
          lastName: string
          memberSince: string
          phoneNumber: string
        }
        Update: {
          address?: string
          email?: string
          firstName?: string
          id?: string
          lastName?: string
          memberSince?: string
          phoneNumber?: string
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
