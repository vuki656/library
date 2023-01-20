import { z } from 'zod'

import { employeeValidation } from '../Employees.validation'

export const employeeUpdateValidation = employeeValidation.and(
    z.object({
        id: z.string(),
    })
)
