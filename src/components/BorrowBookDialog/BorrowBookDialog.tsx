import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Group,
    Modal,
    Select,
    Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBookUpload } from '@tabler/icons'
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

import type { BorrowBookFormValueType } from './BorrowBookDialog.types'
import { borrowBookValidation } from './BorrowBookDialog.validation'

export const BorrowBookDialog = () => {
    const [isOpen, setIsOpen] = useState(true)

    const [members, setMembers] = useState<MemberType[]>([])
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
                        borrowedBy: book.member as MemberType,
                    }
                }))
            })
    }

    const fetchMembers = () => {
        void supabase
            .from(TABLES.members)
            .select('*')
            .order('firstName')
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error fetching members',
                        title: 'Error',
                    })

                    return
                }

                setMembers(response.data)
            })
    }

    const {
        control,
        handleSubmit,
    } = useForm<BorrowBookFormValueType>({
        resolver: zodResolver(borrowBookValidation),
    })

    useEffect(() => {
        fetchMembers()
        fetchBooks()
    }, [])

    const onSubmit = (formValue: BorrowBookFormValueType) => {
        void supabase
            .from(TABLES.books)
            .update({
                borrowedByMemberFk: formValue.memberId,
            })
            .eq('id', formValue.bookId)
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error borrowing book',
                        title: 'Error',
                    })

                    return
                }

                showNotification({
                    color: 'green',
                    message: 'Book borrowed successfully',
                    title: 'Success',
                })
            })
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            <Button
                leftIcon={<IconBookUpload size={DEFAULT_ICON_SIZE} />}
                onClick={onOpen}
                variant="default"
            >
                Borrow Book
            </Button>
            {isOpen ? (
                <Modal
                    onClose={onClose}
                    opened={isOpen}
                    title="Borrow Book"
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
                                            data={books.map((book) => {
                                                return {
                                                    disabled: Boolean(book.borrowedBy),
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
                            <Controller
                                control={control}
                                name="memberId"
                                render={(controller) => {
                                    return (
                                        <Select
                                            clearable={true}
                                            data={members.map((member) => {
                                                return {
                                                    label: `${member.firstName} ${member.lastName}`,
                                                    value: member.id,
                                                }
                                            })}
                                            label="Member"
                                            onChange={(bookId) => {
                                                controller.field.onChange(bookId)
                                            }}
                                            placeholder="Select a member"
                                            searchable={true}
                                            value={controller.field.value}
                                            {...extractFormFieldErrors(controller.formState.errors.memberId)}
                                        />
                                    )
                                }}
                            />
                            <Group position="right">
                                <Button
                                    onClick={onClose}
                                    variant="outline"
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
            ) : null}
        </>
    )
}