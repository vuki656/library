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

import type { AuthorDeleteDialogProps } from './AuthorDeleteDialog.types'

export const AuthorDeleteDialog = (props: AuthorDeleteDialogProps) => {
    const {
        author,
        onSubmit,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const onDelete = () => {
        void supabase
            .from(TABLES.authors)
            .delete()
            .eq('id', author.id)
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error deleting author',
                        title: 'Error',
                    })

                    return
                }

                showNotification({
                    color: 'green',
                    message: 'author deleted successfully',
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
                        {`${author.firstName} ${author.lastName}`}
                    </strong>
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
