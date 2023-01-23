import { z } from 'zod'

export const returnBookValidation = z.object({
    bookId: z.string(),
})
