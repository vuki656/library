import type { z } from 'zod'

import type { bookCreateValidation } from './BookCreateDialog.validation'

export type BookCreateFormValueType = z.infer<typeof bookCreateValidation>

export type BookCreateDialogProps = {
    onSubmit(): void
}
