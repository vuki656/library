import type { MemberType } from '../Members.types'

export type MemberDeleteDialogProps = {
    disabled: boolean
    member: MemberType
    onSubmit(): void
}
