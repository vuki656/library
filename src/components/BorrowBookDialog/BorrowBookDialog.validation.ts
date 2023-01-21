import { z } from 'zod'

export const borrowBookValidation = z.object({
    bookId: z.string(),
    memberId: z.string(),
})
