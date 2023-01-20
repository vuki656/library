import { z } from "zod"

export const employeePasswordValidation = z.object({
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
