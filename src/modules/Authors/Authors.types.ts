import type { BookType } from '../Books'

export type AuthorType = {
    books?: BookType[]
    firstName: string
    id: string
    lastName: string
}
