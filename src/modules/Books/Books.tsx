import {
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
    IconCheck,
    IconX,
} from '@tabler/icons-react'
import {
    useEffect,
    useState,
} from 'react'

import { DEFAULT_ICON_SIZE } from '../../shared/constants'
import {
    supabase,
    TABLES,
} from '../../shared/utils'

import { BookCreateDialog } from './BookCreateDialog'
import { BookDeleteDialog } from './BookDeleteDialog'
import type { BookQueryType } from './Books.types'
import { BookUpdateDialog } from './BookUpdateDialog'

export const Books = () => {
    const [books, setBooks] = useState<BookQueryType[]>([])

    const fetchBooks = () => {
        void supabase
            .from(TABLES.books)
            .select(`
                id,
                name,
                pageCount,
                releaseDate,
                borrowedBy: members (
                    id,
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    email,
                    memberSince
                )
            `)
            .order('name')
            .returns<BookQueryType>()
            .then((response) => {
                if (response.error) {
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

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <Stack
            spacing={0}
            sx={{ flex: 1 }}
        >
            <Paper
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.gray[2]}`,
                    borderRadius: 0,
                    padding: theme.spacing.md,
                })}
            >
                <Group position="apart">
                    <Title order={3}>
                        Books
                    </Title>
                    <BookCreateDialog onSubmit={fetchBooks} />
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    overflow: 'auto',
                    padding: theme.spacing.md,
                })}
            >
                {books.map((book) => {
                    return (
                        <Paper
                            key={book.id}
                            shadow="xs"
                        >
                            <Group
                                position="apart"
                                sx={(theme) => ({
                                    padding: theme.spacing.md,
                                })}
                            >
                                <Group>
                                    {book.borrowedBy ? (
                                        <Tooltip label="Not Available">
                                            <ThemeIcon
                                                color="red"
                                                variant="light"
                                            >
                                                <IconX size={DEFAULT_ICON_SIZE} />
                                            </ThemeIcon>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip label="Available">
                                            <ThemeIcon
                                                color="green"
                                                variant="light"
                                            >
                                                <IconCheck size={DEFAULT_ICON_SIZE} />
                                            </ThemeIcon>
                                        </Tooltip>
                                    )}
                                    <Text>
                                        {book.name}
                                    </Text>
                                </Group>
                                <Group>
                                    <BookUpdateDialog
                                        book={book}
                                        onSubmit={fetchBooks}
                                    />
                                    <BookDeleteDialog
                                        book={book}
                                        disabled={Boolean(book.borrowedBy)}
                                        onSubmit={fetchBooks}
                                    />
                                </Group>
                            </Group>
                        </Paper>
                    )
                })}
            </Stack>
        </Stack>
    )
}
