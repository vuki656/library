import { zodResolver } from '@hookform/resolvers/zod'
import {
    ActionIcon,
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPencil } from '@tabler/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DEFAULT_ICON_SIZE } from '../../../shared/constants'
import {
    extractFormFieldErrors,
    supabase,
    TABLES,
} from '../../../shared/utils'

import type {
    MemberUpdateDialogFormValueType,
    MemberUpdateDialogProps,
} from './MemberUpdateDialog.types'
import { memberUpdateValidation } from './MemberUpdateDialog.validation'

export const MemberUpdateDialog = (props: MemberUpdateDialogProps) => {
    const {
        member,
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const {
        formState,
        handleSubmit,
        register,
    } = useForm<MemberUpdateDialogFormValueType>({
        resolver: zodResolver(memberUpdateValidation),
        values: {
            address: member.address,
            email: member.email,
            firstName: member.firstName,
            id: member.id,
            lastName: member.lastName,
            phoneNumber: member.phoneNumber,
        },
    })

    const onSubmit = (formValue: MemberUpdateDialogFormValueType) => {
        void supabase
            .from(TABLES.members)
            .update({
                address: formValue.address,
                email: formValue.email,
                firstName: formValue.firstName,
                id: formValue.id,
                lastName: formValue.lastName,
                phoneNumber: formValue.phoneNumber,
            })
            .eq('id', member.id)
            .then((response) => {
                if (response.error) {
                    showNotification({
                        color: 'red',
                        message: 'Error updating member',
                        title: 'Error',
                    })

                    return
                }

                onSubmitProp()

                setIsOpen(false)

                showNotification({
                    color: 'green',
                    message: 'Member updated successfully',
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
                title="Update Member"
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
                        <Button type="submit">
                            Update
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
