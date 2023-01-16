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
    EmployeeCreateDialogProps,
    EmployeeCreateFormValue,
} from './EmployeeCreateDialog.types'
import { employeeValidation } from './EmployeeCreateDialog.validation'

export const EmployeeCreateDialog = (props: EmployeeCreateDialogProps) => {
    const {
        onSubmit: onSubmitProp,
    } = props

    const [isOpen, setIsOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<EmployeeCreateFormValue>({
        resolver: zodResolver(employeeValidation),
    })

    const onSubmit = async (formValue: EmployeeCreateFormValue) => {
        try {
            const response = await supabase
                .auth
                .signUp({
                    email: formValue.email,
                    password: formValue.password,
                })

            if (!response.data.user) {
                throw new Error('No user after create')
            }

            await supabase
                .from(TABLES.employees)
                .insert({
                    email: formValue.email,
                    first_name: formValue.firstName,
                    id: response.data.user.id,
                    last_name: formValue.lastName,
                })

            onSubmitProp()

            setIsOpen.close()

            reset()

            showNotification({
                color: 'green',
                message: 'Employee created successfully',
                title: 'Success',
            })
        } catch (error) {
            console.error(error)

            showNotification({
                color: 'red',
                message: 'Error creating employee',
                title: 'Error',
            })
        }
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
                title="Create Employee"
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
                        <TextInput
                            {...register('password')}
                            {...extractFormFieldErrors(formState.errors.password)}
                            label="Password"
                            placeholder="Your password"
                            type="password"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('passwordConfirmation')}
                            {...extractFormFieldErrors(formState.errors.passwordConfirmation)}
                            label="Password Confirmation"
                            placeholder="Repeat your password"
                            type="password"
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
