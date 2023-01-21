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
    MemberCreatDialogProps,
    MemberCreateDialogFormValueType,
} from './MemberCreateDialog.types'
import { memberCreateValidation } from './MemberCreateDialog.validation'

export const MemberCreateDialog = (props: MemberCreatDialogProps) => {
    const {
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<MemberCreateDialogFormValueType>({
        resolver: zodResolver(memberCreateValidation),
    })

    const onSubmit = (formValue: MemberCreateDialogFormValueType) => {
        void supabase
            .from(TABLES.members)
            .insert({
                address: formValue.address,
                email: formValue.email,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                memberSince: new Date().toDateString(),
                phoneNumber: formValue.phoneNumber,
            })
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error creating member',
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
                title="Create Member"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            {...register('firstName')}
                            {...extractFormFieldErrors(formState.errors.firstName)}
                            label="First Name"
                            placeholder="Member first name"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('lastName')}
                            {...extractFormFieldErrors(formState.errors.lastName)}
                            label="Last Name"
                            placeholder="Member last name"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('address')}
                            {...extractFormFieldErrors(formState.errors.address)}
                            label="Address"
                            placeholder="Member address"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('email')}
                            {...extractFormFieldErrors(formState.errors.email)}
                            label="Email"
                            placeholder="Member email"
                            type="email"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('phoneNumber')}
                            {...extractFormFieldErrors(formState.errors.phoneNumber)}
                            label="Phone Number"
                            placeholder="Member phone number"
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
