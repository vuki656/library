import { z } from "zod"
import { BookType } from "../Books.types"
import { bookUpdateValidation } from "./BookUpdateDialog.validation"

export type BookUpdateDialogProps = {
    book: BookType
    onSubmit(): void
}

export type BookUpdateFormValueType = z.infer<typeof bookUpdateValidation>
