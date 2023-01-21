import { z } from "zod";
import { bookValidation } from "../Books.validation";

const validation = z.object({
    id: z.string()
})

export const bookUpdateValidation = bookValidation.and(validation)
