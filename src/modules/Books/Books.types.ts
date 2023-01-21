import type { AuthorType } from '../Authors'
import type { MemberType } from '../Members'

export type BookType = {
    author: AuthorType
    borrowedBy: MemberType
    id: string
    name: string
    pageCount: number
    releaseDate: string
}
