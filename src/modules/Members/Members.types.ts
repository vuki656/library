import type { BookType } from '../Books'

export type MemberType = {
    address: string
    borrowedBooks?: BookType[] | null
    email: string
    firstName: string
    id: string
    lastName: string
    memberSince: string
    phoneNumber: string
}
