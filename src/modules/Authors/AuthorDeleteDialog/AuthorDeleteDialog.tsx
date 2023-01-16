import {
    Button,
    Group,
    Modal,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons'

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

    const [isOpen, setIsOpen] = useDisclosure(false)

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

                setIsOpen.close()

                onSubmit()
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
                <Text>
                    Are you sure you want to delete
                    {' '}
                    <strong>
                        {`${author.first_name} ${author.last_name}`}
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
