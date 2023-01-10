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
import {
    doc,
    setDoc,
} from 'firebase/firestore'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'

import {
    auth,
    COLLECTION_NAMES,
    database,
    extractFormFieldErrors,
} from '../../../shared/utils'

import type { EmployeeCreateFormValue } from './EmployeeCreateDialog.types'
import { employeeValidation } from './EmployeeCreateDialog.validation'

export const EmployeeCreateDialog = () => {
    const [isOpen, setIsOpen] = useDisclosure(false)

    const [createUserWithEmailAndPassword,, loading] = useCreateUserWithEmailAndPassword(auth)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<EmployeeCreateFormValue>({
        resolver: zodResolver(employeeValidation),
    })

    const onSubmit = (formValue: EmployeeCreateFormValue) => {
        createUserWithEmailAndPassword(formValue.email, formValue.password)
            .then(async (response) => {
                if (!response) {
                    throw new Error('No response after creating user')
                }

                const reference = doc(
                    database,
                    COLLECTION_NAMES.employees,
                    response.user.uid
                )

                await setDoc(reference, {
                    email: formValue.email,
                    firstName: formValue.firstName,
                    id: response.user.uid,
                    lastName: formValue.lastName,
                })

                setIsOpen.close()

                reset()

                showNotification({
                    color: 'green',
                    message: 'User created successfully',
                    title: 'Success',
                })
            })
            .catch((error: unknown) => {
                console.error(error)

                showNotification({
                    color: 'red',
                    message: 'Failed to create an employee',
                    title: 'Error',
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
                            loading={loading}
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
