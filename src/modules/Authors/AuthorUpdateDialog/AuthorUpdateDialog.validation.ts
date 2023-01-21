import { z } from 'zod'

import { authorValidation } from '../Authors.validation'

export const authorUpdateValidation = authorValidation.and(
    z.object({
        id: z.string(),
    })
)
