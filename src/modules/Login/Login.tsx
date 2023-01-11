import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Center,
    Paper,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { extractFormFieldErrors } from '../../shared/utils'

import type { LoginFormValueType } from './Login.types'
import { loginValidation } from './Login.validation'

// FIXME: flashes after login
export const Login = () => {
    const router = useRouter()

    const {
        formState,
        handleSubmit,
        register,
    } = useForm<LoginFormValueType>({
        resolver: zodResolver(loginValidation),
    })

    const onSubmit = (formValue: LoginFormValueType) => {
        void router.push('/employees')
    }

    return (
        <Center sx={{ height: '100%' }}>
            <Paper
                shadow="xs"
                sx={(theme) => ({
                    padding: theme.spacing.xl,
                    width: '350px',
                })}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Title>
                        Login
                    </Title>
                    <Stack
                        spacing={10}
                        sx={(theme) => ({
                            paddingBottom: theme.spacing.xl,
                            paddingTop: theme.spacing.xl,
                        })}
                    >
                        <TextInput
                            {...register('email')}
                            {...extractFormFieldErrors(formState.errors.email)}
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            withAsterisk={true}
                        />
                        <TextInput
                            {...register('password')}
                            {...extractFormFieldErrors(formState.errors.password)}
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            withAsterisk={true}
                        />
                    </Stack>
                    <Button
                        fullWidth={true}
                        loading={false}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Center>
    )
}
