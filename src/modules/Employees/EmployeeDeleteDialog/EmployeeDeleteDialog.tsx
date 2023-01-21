import {
    ActionIcon,
    Button,
    Group,
    Modal,
    Text,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons'
import { useState } from 'react'

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

    const [isOpen, setIsOpen] = useState(false)

    const onDelete = () => {
        void supabase
            .from(TABLES.employees)
            .delete()
            .eq('id', employee.id)
            .then(async (response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error deleting employee',
                        title: 'Error',
                    })

                    return
                }

                await supabase
                    .auth
                    .admin
                    .deleteUser(employee.id)
                    .catch((error: unknown) => {
                        console.error(error)

                        showNotification({
                            color: 'red',
                            message: 'Error deleting employee',
                            title: 'Error',
                        })
                    })

                showNotification({
                    color: 'green',
                    message: 'Employee deleted successfully',
                    title: 'Success',
                })

                setIsOpen(false)

                onSubmit()
            })
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            <ActionIcon
                color="blue"
                onClick={onOpen}
                variant="light"
            >
                <IconTrash size={20} />
            </ActionIcon>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Confirm Deletion"
            >
                <Text>
                    Are you sure you want to delete
                    {' '}
                    <strong>
                        {`${employee.firstName} ${employee.lastName}`}
                    </strong>
                    {' '}
                    ?
                </Text>
                <Group position="right">
                    <Button
                        onClick={onClose}
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
