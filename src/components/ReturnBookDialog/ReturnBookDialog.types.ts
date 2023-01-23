import type { z } from 'zod'

import type { returnBookValidation } from './ReturnBookDialog.validation'

export type ReturnBookFormValueType = z.infer<typeof returnBookValidation>
