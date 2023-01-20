import { employeePasswordValidation } from '../EmployeeChangePasswordDialog'
import { employeeValidation } from '../Employees.validation'

export const employeeCreateValidation = employeeValidation.and(employeePasswordValidation)
