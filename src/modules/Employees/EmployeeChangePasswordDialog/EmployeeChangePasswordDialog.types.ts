import type { z } from 'zod'

import type { employeePasswordValidation } from './EmployeeChangePasswordDialog.validation'

export type EmployeeChangePasswordFormValueType = z.infer<typeof employeePasswordValidation>

export type EmployeeChangePasswordDialogProps = {
    onSubmit(): void
}
