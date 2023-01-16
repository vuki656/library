import type { z } from 'zod'

import type { authorValidation } from './AuthorCreateDialog.validation'

export type AuthorCreateDialogFormValueType = z.infer<typeof authorValidation>

export type AuthorCreatDialogProps = {
    onSubmit(): void
}
