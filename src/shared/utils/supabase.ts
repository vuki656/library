import { createClient } from '@supabase/supabase-js'

import type { Database } from '../types/supabase'

export const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
)

export enum TABLES {
    authors = 'authors',
    books = 'books',
    employees = 'employees',
    members = 'members'
}
