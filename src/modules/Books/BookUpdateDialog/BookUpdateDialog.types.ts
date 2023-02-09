import type { z } from 'zod'

import type { AuthorType } from '../../Authors'
import type { BookType } from '../Books.types'

import type { bookUpdateValidation } from './BookUpdateDialog.validation'

export type BookUpdateDialogProps = {
    book: BookType & {
        author: AuthorType
    }
    onSubmit(): void
}

export type BookUpdateFormValueType = z.infer<typeof bookUpdateValidation>
