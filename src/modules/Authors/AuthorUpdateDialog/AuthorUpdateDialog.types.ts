import type { z } from 'zod'

import type { AuthorType } from '../Authors.types'

import type { authorUpdateValidation } from './AuthorUpdateDialog.validation'

export type AuthorUpdateDialogProps = {
    author: AuthorType
    onSubmit(): void
}

export type AuthorUpdateDialogFormValueType = z.input<typeof authorUpdateValidation>
