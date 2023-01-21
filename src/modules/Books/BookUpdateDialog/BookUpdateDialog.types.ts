import type { z } from 'zod'

import type { BookType } from '../Books.types'

import type { bookUpdateValidation } from './BookUpdateDialog.validation'

export type BookUpdateDialogProps = {
    book: BookType
    onSubmit(): void
}

export type BookUpdateFormValueType = z.infer<typeof bookUpdateValidation>
