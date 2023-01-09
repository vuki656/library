import { z } from 'zod'

export const employeeValidation = z
    .object({
        email: z
            .string()
            .email(),
        firstName: z
            .string()
            .min(2, { message: 'Must be at least 2 characters' })
            .max(100, { message: 'Can\'t be longer than 100 characters' }),
        lastName: z
            .string()
            .min(2, { message: 'Must be at least 2 characters' })
            .max(100, { message: 'Can\'t be longer than 100 characters' }),
        password: z
            .string()
            .min(8, { message: 'Must be at least 8 characters' })
            .max(100, { message: 'Can\'t be longer than 100 characters' }),
        passwordConfirmation: z
            .string()
            .min(8, { message: 'Must be at least 8 characters' })
            .max(100, { message: 'Can\'t be longer than 100 characters' }),
    })
    .refine((data) => {
        return data.password === data.passwordConfirmation
    }, {
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
    })
