import { ThemeIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import type { EmployeeDeleteDialogProps } from './EmployeeDeleteDialog.types'

export const EmployeeDeleteDialogPropsDialog = (props: EmployeeDeleteDialogProps) => {
    const { id } = props

    const onDelete = () => {
        console.log(id)
    }

    return (
        <>
            <ThemeIcon variant="light">
                <IconTrash size={20} />
            </ThemeIcon>
        </>
    )
}
