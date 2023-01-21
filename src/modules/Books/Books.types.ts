import { AuthorType } from "../Authors"

export type BookType = {
    id: string
    name: string
    pageCount: number
    releaseDate: Date
    author: AuthorType
}
