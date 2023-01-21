import { z } from 'zod'

export const memberValidation = z.object({
    address: z
        .string()
        .min(5, { message: 'Must be at least 5 characters' })
        .max(200, { message: 'Can\'t be longer than 200 characters' }),
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
    phoneNumber: z
        .string()
        .min(6, { message: 'Must be at least 2 characters' })
        .max(20, { message: 'Can\'t be longer than 20 characters' }),
})
