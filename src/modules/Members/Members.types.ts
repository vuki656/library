import type { BookType } from '../Books'

export type MemberType = {
    address: string
    email: string
    firstName: string
    id: string
    lastName: string
    memberSince: string
    phoneNumber: string
}

export type MemberQueryData = MemberType & {
    borrowedBooks: BookType[]
}
