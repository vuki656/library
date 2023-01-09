import type { FieldError } from 'react-hook-form'

import type { ExtractFormFieldErrorValue } from './extractFormFieldErrors.types'

export function extractFormFieldErrors(fieldError: FieldError | undefined): ExtractFormFieldErrorValue {
    if (!fieldError?.message) {
        return {
            error: '',
        }
    }

    return {
        error: fieldError.message,
    }
}
