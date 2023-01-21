import { z } from 'zod'

import { memberValidation } from '../Members.validation'

export const memberUpdateValidation = memberValidation.and(
    z.object({
        id: z.string(),
    })
)
