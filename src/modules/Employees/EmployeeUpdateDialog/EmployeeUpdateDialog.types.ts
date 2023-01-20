import type { z } from 'zod'

import type { EmployeeType } from '../Employees.types'

import type { employeeUpdateValidation } from './EmployeeUpdateDialog.validation'

export type EmployeeUpdateFormValueType = z.infer<typeof employeeUpdateValidation>

export type EmployeeUpdateDialogProps = {
    employee: EmployeeType
    onSubmit(): void
}
