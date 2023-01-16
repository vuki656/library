import { z } from 'zod'

import { authorValidation } from '../AuthorCreateDialog'

export const authorUpdateValidation = authorValidation.and(
    z.object({
        id: z.string(),
    })
)
