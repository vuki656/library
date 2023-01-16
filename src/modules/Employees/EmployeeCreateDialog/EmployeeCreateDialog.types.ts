import type { z } from 'zod'

import type { employeeValidation } from './EmployeeCreateDialog.validation'

export type EmployeeCreateFormValue = z.infer<typeof employeeValidation>

export type EmployeeCreateDialogProps = {
    onSubmit(): void
}
