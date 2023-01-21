import {
    Group,
    Paper,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
    useEffect,
    useState,
} from 'react'

import {
    supabase,
    TABLES,
} from '../../shared/utils'
import { AuthorType } from '../Authors'

import { BookCreateDialog } from './BookCreateDialog'
import { BookDeleteDialog } from './BookDeleteDialog'
import type { BookType } from './Books.types'
import { BookUpdateDialog } from './BookUpdateDialog'

export const Books = () => {
    const [books, setBooks] = useState<BookType[]>([])

    const fetchBooks = () => {
        void supabase
            .from(TABLES.books)
            .select('*, author:authors(*)')
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
                        id: book.id,
                        name: book.name,
                        pageCount: book.pageCount,
                        releaseDate: new Date(book.releaseDate),
                        author: book.author as AuthorType,
                    }
                }))
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
