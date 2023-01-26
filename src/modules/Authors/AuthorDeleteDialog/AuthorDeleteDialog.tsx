import {
    ActionIcon,
    Button,
    Group,
    Modal,
    Stack,
    Text,
    Tooltip,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
import {
    supabase,
    TABLES,
} from '../../../shared/utils'

import type { AuthorDeleteDialogProps } from './AuthorDeleteDialog.types'

export const AuthorDeleteDialog = (props: AuthorDeleteDialogProps) => {
    const {
        author,
        disabled,
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
        if (disabled) {
            return
        }

        setIsOpen(true)
    }

    return (
        <>
            <Tooltip
                disabled={!disabled}
                label="Can't delete an author with books"
            >
                <ActionIcon
                    color="blue"
                    onClick={onOpen}
                    variant="light"
                >
                    <IconTrash size={DEFAULT_ICON_SIZE} />
                </ActionIcon>
            </Tooltip>
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
                            {`${author.firstName} ${author.lastName}`}
                        </strong>
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
