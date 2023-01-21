import type { z } from 'zod'

import type { MemberType } from '../Members.types'

import type { memberUpdateValidation } from './MemberUpdateDialog.validation'

export type MemberUpdateDialogProps = {
    member: MemberType
    onSubmit(): void
}

export type MemberUpdateDialogFormValueType = z.input<typeof memberUpdateValidation>
