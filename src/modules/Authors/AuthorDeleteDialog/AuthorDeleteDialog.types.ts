import type { AuthorType } from '../Authors.types'

export type AuthorDeleteDialogProps = {
    author: AuthorType
    onSubmit(): void
    disabled: boolean
}
