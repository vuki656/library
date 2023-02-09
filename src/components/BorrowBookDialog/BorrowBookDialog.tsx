import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Group,
    Modal,
    Select,
    Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBookUpload } from '@tabler/icons-react'
import {
    useEffect,
    useState,
} from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import type {
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
    const [isOpen, setIsOpen] = useState(false)

    const [members, setMembers] = useState<MemberType[]>([])
    const [books, setBooks] = useState<BookType[]>([])

    const fetchBooks = () => {
        void supabase
            .from(TABLES.books)
            .select(`
                id,
                name,
                pageCount,
                releaseDate
            `)
            .order('name')
            .is('borrowedByMemberFk', null)
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

                setBooks(response.data)
            })
    }

    const fetchMembers = () => {
        void supabase
            .from(TABLES.members)
            .select(`
                id,
                firstName,
                email,
                lastName,
                phoneNumber,
                address,
                memberSince
            `)
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

    const { control, handleSubmit } = useForm<BorrowBookFormValueType>({
        resolver: zodResolver(borrowBookValidation),
    })

    useEffect(() => {
        fetchMembers()
        fetchBooks()
    }, [isOpen])

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

                setIsOpen(false)

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
                                                label: book.name,
                                                value: book.id,
                                            }
                                        })}
                                        label="Book"
                                        onChange={controller.field.onChange}
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
                                        onChange={controller.field.onChange}
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
