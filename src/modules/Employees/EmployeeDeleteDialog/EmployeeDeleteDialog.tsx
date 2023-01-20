import {
    ActionIcon,
    Button,
    Group,
    Modal,
    Text,
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
    const {
        employee,
        onSubmit,
    } = props

    const [isOpen, setIsOpen] = useDisclosure(false)

    const onDelete = () => {
        void supabase
            .from(TABLES.employees)
            .delete()
            .eq('id', employee.id)
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

                onSubmit()
            })
    }

    return (
        <>
            <ActionIcon
                color="blue"
                onClick={setIsOpen.open}
                variant="light"
            >
                <IconTrash size={20} />
            </ActionIcon>
            <Modal
                onClose={setIsOpen.close}
                opened={isOpen}
                title="Confirm Deletion"
            >
                <Text>
                    Are you sure you want to delete
                    {' '}
                    <strong>
                        {`${employee.firstName} ${employee.lastName}`}
                    </strong>
                    ?
                </Text>
                <Group position="right">
                    <Button
                        onClick={setIsOpen.close}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={onDelete}
                    >
                        Confirm
                    </Button>
                </Group>
            </Modal>
        </>
    )
}
