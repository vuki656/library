import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    TextInput,
    ThemeIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconPencil } from '@tabler/icons'
import { useForm } from 'react-hook-form'

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

    const [isOpen, setIsOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<AuthorUpdateDialogFormValueType>({
        defaultValues: {
            firstName: author.first_name,
            id: author.id,
            lastName: author.last_name,
        },
        resolver: zodResolver(authorUpdateValidation),
    })

    const onSubmit = (formValue: AuthorUpdateDialogFormValueType) => {
        void supabase
            .from(TABLES.authors)
            .update({
                first_name: formValue.firstName,
                last_name: formValue.lastName,
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

                setIsOpen.close()

                reset()

                showNotification({
                    color: 'green',
                    message: 'Author updated successfully',
                    title: 'Success',
                })
            })
    }

    return (
        <>
            <ThemeIcon
                onClick={setIsOpen.open}
                variant="light"
            >
                <IconPencil size={20} />
            </ThemeIcon>
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
