import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons'
import { useForm } from 'react-hook-form'

import {
    extractFormFieldErrors,
} from '../../../shared/utils'

import type { EmployeeCreateFormValue } from './EmployeeCreateDialog.types'
import { employeeValidation } from './EmployeeCreateDialog.validation'

export const EmployeeCreateDialog = () => {
    const [isOpen, setIsOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<EmployeeCreateFormValue>({
        resolver: zodResolver(employeeValidation),
    })

    const onSubmit = (formValue: EmployeeCreateFormValue) => {
        console.log(formValue)
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
