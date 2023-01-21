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
    EmployeeUpdateDialogProps,
    EmployeeUpdateFormValueType,
} from './EmployeeUpdateDialog.types'
import { employeeUpdateValidation } from './EmployeeUpdateDialog.validation'

export const EmployeeUpdateDialog = (props: EmployeeUpdateDialogProps) => {
    const {
        employee,
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const {
        formState,
        handleSubmit,
        register,
    } = useForm<EmployeeUpdateFormValueType>({
        resolver: zodResolver(employeeUpdateValidation),
        values: {
            email: employee.email,
            firstName: employee.firstName,
            id: employee.id,
            lastName: employee.lastName,
        },
    })

    const onSubmit = (formValue: EmployeeUpdateFormValueType) => {
        void supabase
            .from(TABLES.employees)
            .update({
                email: formValue.email,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
            })
            .eq('id', formValue.id)
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error updating employee',
                        title: 'Error',
                    })

                    return
                }

                onSubmitProp()

                setIsOpen(false)

                showNotification({
                    color: 'green',
                    message: 'Employee updated successfully',
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
                title="Update Employee"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            {...register('firstName')}
                            {...extractFormFieldErrors(formState.errors.firstName)}
                            label="First Name"
                            placeholder="Your first name"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('lastName')}
                            {...extractFormFieldErrors(formState.errors.lastName)}
                            label="Last Name"
                            placeholder="Your name"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('email')}
                            {...extractFormFieldErrors(formState.errors.email)}
                            label="Email"
                            placeholder="Your email"
                            type="email"
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
