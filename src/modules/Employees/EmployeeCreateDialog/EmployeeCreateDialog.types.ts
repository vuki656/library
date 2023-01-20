import type { z } from 'zod'

import type { employeeCreateValidation } from './EmployeeCreateDialog.validation'

export type EmployeeCreateFormValueType = z.infer<typeof employeeCreateValidation>

export type EmployeeCreateDialogProps = {
    onSubmit(): void
}
