import { zodResolver } from '@hookform/resolvers/zod'
import {
    ActionIcon,
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPencil } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
import {
    extractFormFieldErrors,
    supabase,
    TABLES,
} from '../../../shared/utils'

import type {
    AuthorUpdateDialogFormValueType,
    AuthorUpdateDialogProps,
} from './AuthorUpdateDialog.types'
import { authorUpdateValidation } from './AuthorUpdateDialog.validation'

export const AuthorUpdateDialog = (props: AuthorUpdateDialogProps) => {
    const {
        author,
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const {
        formState,
        handleSubmit,
        register,
    } = useForm<AuthorUpdateDialogFormValueType>({
        resolver: zodResolver(authorUpdateValidation),
        values: {
            firstName: author.firstName,
            id: author.id,
            lastName: author.lastName,
        },
    })

    const onSubmit = (formValue: AuthorUpdateDialogFormValueType) => {
        void supabase
            .from(TABLES.authors)
            .update({
                firstName: formValue.firstName,
                lastName: formValue.lastName,
            })
            .eq('id', author.id)
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error updating author',
                        title: 'Error',
                    })

                    return
                }

                onSubmitProp()

                setIsOpen(false)

                showNotification({
                    color: 'green',
                    message: 'Author updated successfully',
                    title: 'Success',
                })
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
                <IconPencil size={DEFAULT_ICON_SIZE} />
            </ActionIcon>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Update Author"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            {...register('firstName')}
                            {...extractFormFieldErrors(formState.errors.firstName)}
                            label="First Name"
                            placeholder="Author first name"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('lastName')}
                            {...extractFormFieldErrors(formState.errors.lastName)}
                            label="Last Name"
                            placeholder="Author last name"
                            withAsterisk={true}
                        />
                        <Button type="submit">
                            Update
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
