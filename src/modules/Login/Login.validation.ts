import { z } from 'zod'

export const loginValidation = z
    .object({
        email: z
            .string()
            .email()
            .min(1, { message: 'Required' }),
        password: z
            .string()
            .min(1, { message: 'Required' }),
    })
