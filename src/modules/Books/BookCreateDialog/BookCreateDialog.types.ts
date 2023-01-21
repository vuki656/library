import type { z } from 'zod'

import type { bookValidation } from './BookCreateDialog.validation'

export type BookCreateFormValueType = z.infer<typeof bookValidation>

export type BookCreateDialogProps = {
    onSubmit(): void
}
