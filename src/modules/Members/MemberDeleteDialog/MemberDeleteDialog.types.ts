import { MemberType } from '../Members.types'

export type MemberDeleteDialogProps = {
    member: MemberType
    onSubmit(): void
}
