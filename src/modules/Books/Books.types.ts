import type { MemberType } from '../Members'

export type BookType = {
    id: string
    name: string
    pageCount: number
    releaseDate: string
}

export type BookQueryType = BookType & {
    borrowedBy: MemberType | null
}
