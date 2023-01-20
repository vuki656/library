import { z } from "zod"
import { employeePasswordValidation } from "./EmployeeChangePasswordDialog.validation"

export type EmployeeChangePasswordFormValueType = z.infer<typeof employeePasswordValidation>

export type EmployeeChangePasswordDialogProps = {
    onSubmit(): void
}
