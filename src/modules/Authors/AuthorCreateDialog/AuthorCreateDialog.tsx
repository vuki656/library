import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
import {
    extractFormFieldErrors,
    supabase,
    TABLES,
} from '../../../shared/utils'

import type {
    AuthorCreateDialogFormValueType,
    AuthorCreateDialogProps,
} from './AuthorCreateDialog.types'
import { authorCreateValidation } from './AuthorCreateDialog.validation'

export const AuthorCreateDialog = (props: AuthorCreateDialogProps) => {
    const {
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<AuthorCreateDialogFormValueType>({
        resolver: zodResolver(authorCreateValidation),
    })

    const onSubmit = (formValue: AuthorCreateDialogFormValueType) => {
        void supabase
            .from(TABLES.authors)
            .insert({
                firstName: formValue.firstName,
                lastName: formValue.lastName,
            })
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error creating author',
                        title: 'Error',
                    })

                    return
                }

                onSubmitProp()

                setIsOpen(false)

                reset()

                showNotification({
                    color: 'green',
                    message: 'Employee created successfully',
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
            <Button
                leftIcon={<IconPlus size={DEFAULT_ICON_SIZE} />}
                onClick={onOpen}
            >
                Create
            </Button>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Create Author"
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
                        <Button
                            type="submit"
                        >
                            Create
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
