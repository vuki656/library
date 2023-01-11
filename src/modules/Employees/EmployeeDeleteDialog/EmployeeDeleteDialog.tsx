import { ThemeIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { useDeleteUser } from 'react-firebase-hooks/auth'
import { auth } from '../../../shared/utils'
import type { EmployeeDeleteDialogProps } from './EmployeeDeleteDialog.types'

export const EmployeeDeleteDialogPropsDialog = (props: EmployeeDeleteDialogProps) => {
    const { id } = props

    const [deleteUser, loading, error] = useDeleteUser(auth)

    const onDelete = () => {
        auth.
    }

    return (
        <>
            <ThemeIcon variant="light">
                <IconTrash size={20} />
            </ThemeIcon>
        </>
    )
}
