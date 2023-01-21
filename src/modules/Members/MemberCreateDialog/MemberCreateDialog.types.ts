import type { z } from 'zod'

import type { memberCreateValidation } from './MemberCreateDialog.validation'

export type MemberCreateDialogFormValueType = z.infer<typeof memberCreateValidation>

export type MemberCreateDialogProps = {
    onSubmit(): void
}
