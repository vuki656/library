import {
    Button,
    Group,
    Modal,
    ThemeIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons'

import {
    supabase,
    TABLES,
} from '../../../shared/utils'

import type { EmployeeDeleteDialogProps } from './EmployeeDeleteDialog.types'

export const EmployeeDeleteDialogDialog = (props: EmployeeDeleteDialogProps) => {
    const { id } = props

    const [isOpen, setIsOpen] = useDisclosure(false)

    const onDelete = () => {
        supabase
            .from(TABLES.employees)
            .delete()
            .eq('id', id)
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error deleting employee',
                        title: 'Error',
                    })

                    return
                }

                showNotification({
                    color: 'green',
                    message: 'Employee deleted successfully',
                    title: 'Success',
                })

                setIsOpen.close()
            })
    }

    return (
        <>
            <ThemeIcon
                onClick={setIsOpen.open}
                variant="light"
            >
                <IconTrash size={20} />
            </ThemeIcon>
            <Modal
                onClose={setIsOpen.close}
                opened={isOpen}
                title="Confirm Deletion"
            >
                <Group position="right">
                    <Button
                        color="gray"
                        onClick={setIsOpen.close}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={onDelete}
                        variant="outline"
                    >
                        Confirm
                    </Button>
                </Group>
            </Modal>
        </>
    )
}
