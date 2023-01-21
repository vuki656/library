import type { z } from 'zod'

import type { borrowBookValidation } from './BorrowBookDialog.validation'

export type BorrowBookFormValueType = z.infer<typeof borrowBookValidation>
