import {
    ActionIcon,
    Button,
    Group,
    Modal,
    Stack,
    Text,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
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
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error deleting employee',
                        title: 'Error',
                    })
                }
            })
            .then(async () => {
                await supabase
                    .auth
                    .admin
                    .deleteUser(employee.id) // eslint-disable-next-line promise/no-nesting
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
                <IconTrash size={DEFAULT_ICON_SIZE} />
            </ActionIcon>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Confirm Deletion"
            >
                <Stack>
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
                            variant="default"
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
                </Stack>
            </Modal>
        </>
    )
}
