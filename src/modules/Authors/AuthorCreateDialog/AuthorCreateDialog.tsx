import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons'
import { useForm } from 'react-hook-form'

import {
    extractFormFieldErrors,
    supabase,
    TABLES,
} from '../../../shared/utils'

import type {
    AuthorCreatDialogProps,
    AuthorCreateDialogFormValueType,
} from './AuthorCreateDialog.types'
import { authorValidation } from './AuthorCreateDialog.validation'

export const AuthorCreatDialog = (props: AuthorCreatDialogProps) => {
    const {
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<AuthorCreateDialogFormValueType>({
        resolver: zodResolver(authorValidation),
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

                setIsOpen.close()

                reset()

                showNotification({
                    color: 'green',
                    message: 'Employee created successfully',
                    title: 'Success',
                })
            })
    }

    return (
        <>
            <Button
                leftIcon={<IconPlus size={20} />}
                onClick={setIsOpen.open}
            >
                Create
            </Button>
            <Modal
                onClose={setIsOpen.close}
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
                            loading={false}
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
