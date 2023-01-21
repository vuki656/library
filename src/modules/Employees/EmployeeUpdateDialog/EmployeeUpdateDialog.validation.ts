import { z } from 'zod'

import { employeeValidation } from '../Employees.validation'

const validation = z.object({
    id: z.string(),
})

export const employeeUpdateValidation = employeeValidation.and(validation)
