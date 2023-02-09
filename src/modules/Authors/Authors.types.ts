import type { BookType } from '../Books'

export type AuthorType = {
    firstName: string
    id: string
    lastName: string
}

export type AuthorQueryData = AuthorType & {
    books: BookType[]
}
