import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Group,
    Modal,
    Select,
    Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBookDownload } from '@tabler/icons'
import {
    useEffect,
    useState,
} from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import type {
    AuthorType,
    BookType,
    MemberType,
} from '../../modules'
import { DEFAULT_ICON_SIZE } from '../../shared/constants'
import {
    extractFormFieldErrors,
    supabase,
    TABLES,
} from '../../shared/utils'

import type { ReturnBookFormValueType } from './ReturnBookDialog.types'
import { returnBookValidation } from './ReturnBookDialog.validation'

export const ReturnBookDialog = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [books, setBooks] = useState<BookType[]>([])

    const fetchBooks = () => {
        void supabase
            .from(TABLES.books)
            .select('*, author:authors(*), member:members(*)')
            .order('name')
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error fetching books',
                        title: 'Error',
                    })

                    return
                }

                setBooks(response.data.map((book) => {
                    return {
                        ...book,
                        author: book.author as AuthorType,
                        borrowedBy: book.member as MemberType | null,
                    }
                }))
            })
    }

    const {
        control,
        handleSubmit,
    } = useForm<ReturnBookFormValueType>({
        resolver: zodResolver(returnBookValidation),
    })

    useEffect(() => {
        fetchBooks()
    }, [isOpen])

    const onSubmit = (formValue: ReturnBookFormValueType) => {
        void supabase
            .from(TABLES.books)
            .update({
                borrowedByMemberFk: null,
            })
            .eq('id', formValue.bookId)
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error returning book',
                        title: 'Error',
                    })

                    return
                }

                setIsOpen(false)
            })
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    const borrowedBooks = books.reduce<BookType[]>((accumulator, book) => {
        if (!book.borrowedBy) {
            return accumulator
        }

        return [
            ...accumulator,
            book,
        ]
    }, [])

    return (
        <>
            <Button
                leftIcon={<IconBookDownload size={DEFAULT_ICON_SIZE} />}
                onClick={onOpen}
                variant="default"
            >
                Return Book
            </Button>
            <Modal
                onClose={onClose}
                opened={isOpen}
                title="Return Book"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <Controller
                            control={control}
                            name="bookId"
                            render={(controller) => {
                                return (
                                    <Select
                                        clearable={true}
                                        data={borrowedBooks.map((book) => {
                                            return {
                                                label: book.name,
                                                value: book.id,
                                            }
                                        })}
                                        label="Book"
                                        onChange={(bookId) => {
                                            controller.field.onChange(bookId)
                                        }}
                                        placeholder="Select a book"
                                        searchable={true}
                                        value={controller.field.value}
                                        {...extractFormFieldErrors(controller.formState.errors.bookId)}
                                    />
                                )
                            }}
                        />
                        <Group position="right">
                            <Button
                                onClick={onClose}
                                variant="default"
                            >
                                Cancel
                            </Button>
                            <Button
                                color="blue"
                                type="submit"
                            >
                                Confirm
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}

