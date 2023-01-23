import type { BookType } from '../Books.types'

export type BookDeleteDialogProps = {
    book: BookType
    onSubmit(): void
    disabled: boolean
}
