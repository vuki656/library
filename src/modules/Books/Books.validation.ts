import { z } from "zod";

export const bookValidation = z.object({
    author: z
        .string()
        .min(1, 'Must be at least 1 character'),
    name: z
        .string()
        .min(1, 'Must be at least 1 character'),
    pagesCount: z.number(),
    releaseDate: z.date(),
})
