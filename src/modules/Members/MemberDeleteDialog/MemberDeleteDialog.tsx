import {
    ActionIcon,
    Button,
    Group,
    Modal,
    Text,
    Tooltip,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons'
import { useState } from 'react'

import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
import {
    supabase,
    TABLES,
} from '../../../shared/utils'

import type { MemberDeleteDialogProps } from './MemberDeleteDialog.types'

export const MemberDeleteDialog = (props: MemberDeleteDialogProps) => {
    const {
        disabled,
        member,
        onSubmit,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const onDelete = () => {
        void supabase
            .from(TABLES.members)
            .delete()
            .eq('id', member.id)
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error deleting member',
                        title: 'Error',
                    })

                    return
                }

                showNotification({
                    color: 'green',
                    message: 'member deleted successfully',
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
                label="Can't delete member that has unreturned books"
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
                <Text>
                    Are you sure you want to delete
                    {' '}
                    <strong>
                        {`${member.firstName} ${member.lastName}`}
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
            </Modal>
        </>
    )
}
