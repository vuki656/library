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
    })
