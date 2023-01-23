import type { BookType } from '../Books.types'

export type BookDeleteDialogProps = {
    book: BookType
    disabled: boolean
    onSubmit(): void
}
