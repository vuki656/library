import type { z } from 'zod'

import type { authorCreateValidation } from './AuthorCreateDialog.validation'

export type AuthorCreateDialogFormValueType = z.infer<typeof authorCreateValidation>

export type AuthorCreateDialogProps = {
    onSubmit(): void
}
