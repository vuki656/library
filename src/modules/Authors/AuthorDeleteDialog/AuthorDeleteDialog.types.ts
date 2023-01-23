import type { AuthorType } from '../Authors.types'

export type AuthorDeleteDialogProps = {
    author: AuthorType
    disabled: boolean
    onSubmit(): void
}
