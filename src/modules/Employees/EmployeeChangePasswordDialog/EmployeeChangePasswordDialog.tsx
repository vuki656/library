import { zodResolver } from '@hookform/resolvers/zod'
import {
    ActionIcon,
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPassword } from '@tabler/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DEFAULT_ICON_SIZE } from '../../../shared/constants'

import {
    extractFormFieldErrors,
    supabase,
} from '../../../shared/utils'

import type {
    EmployeeChangePasswordDialogProps,
    EmployeeChangePasswordFormValueType,
} from './EmployeeChangePasswordDialog.types'
import { employeePasswordValidation } from './EmployeeChangePasswordDialog.validation'

export const EmployeeChangePasswordDialog = (props: EmployeeChangePasswordDialogProps) => {
    const {
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<EmployeeChangePasswordFormValueType>({
        resolver: zodResolver(employeePasswordValidation),
    })

    const onSubmit = (formValue: EmployeeChangePasswordFormValueType) => {
        void supabase
            .auth
            .updateUser({
                password: formValue.password,
            })
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error update your password',
                        title: 'Error',
                    })

                    return
                }

                onSubmitProp()

                setIsOpen(false)

                reset()

                showNotification({
                    color: 'green',
                    message: 'Password changed successfully',
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
                <IconPassword size={DEFAULT_ICON_SIZE} />
            </ActionIcon>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Change Your Password"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            {...register('password')}
                            {...extractFormFieldErrors(formState.errors.password)}
                            label="Password"
                            placeholder="Your new password"
                            type="password"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('passwordConfirmation')}
                            {...extractFormFieldErrors(formState.errors.passwordConfirmation)}
                            label="Password Confirmation"
                            placeholder="Repeat your new password"
                            type="password"
                            withAsterisk={true}
                        />
                        <Button
                            type="submit"
                        >
                            Update
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
