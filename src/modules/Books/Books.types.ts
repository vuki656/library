import type { AuthorType } from '../Authors'

export type BookType = {
    author: AuthorType
    id: string
    name: string
    pageCount: number
    releaseDate: Date
}
