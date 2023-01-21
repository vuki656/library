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
import { DEFAULT_ICON_SIZE } from '../../../shared/constants'

import {
    supabase,
    TABLES,
} from '../../../shared/utils'

import type { BookDeleteDialogProps } from './BookDeleteDialog.types'

export const BookDeleteDialog = (props: BookDeleteDialogProps) => {
    const {
        book,
        onSubmit,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const onDelete = () => {
        void supabase
            .from(TABLES.books)
            .delete()
            .eq('id', book.id)
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error deleting book',
                        title: 'Error',
                    })

                    return
                }

                showNotification({
                    color: 'green',
                    message: 'Book deleted successfully',
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
                <Text>
                    Are you sure you want to delete
                    {' '}
                    <strong>
                        {`${book.name}`}
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
