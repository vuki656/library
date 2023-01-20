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

import { BookCreateDialog } from './BookCreateDialog'
import type { BookType } from './Books.types'

export const Books = () => {
    const [books, setBooks] = useState<BookType[]>([])

    const fetchBooks = () => {
        void supabase
            .from(TABLES.books)
            .select('*')
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
                    <BookCreateDialog />
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
                                {/* <Group> */}
                                {/*     <ThemeIcon variant="light"> */}
                                {/*         <IconPencil size={20} /> */}
                                {/*     </ThemeIcon> */}
                                {/*     <EmployeeDeleteDialogDialog */}
                                {/*         employee={book} */}
                                {/*         onSubmit={fetchBooks} */}
                                {/*     /> */}
                                {/* </Group> */}
                            </Group>
                        </Paper>
                    )
                })}
            </Stack>

        </Stack>
    )
}
