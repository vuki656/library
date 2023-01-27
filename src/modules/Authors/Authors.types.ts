import type { BookType } from '../Books'

export type AuthorType = {
    books?: BookType[] | null
    firstName: string
    id: string
    lastName: string
}
