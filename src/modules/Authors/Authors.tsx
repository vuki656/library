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
import type { BookType } from '../Books'

import { AuthorCreateDialog } from './AuthorCreateDialog'
import { AuthorDeleteDialog } from './AuthorDeleteDialog'
import type { AuthorType } from './Authors.types'
import { AuthorUpdateDialog } from './AuthorUpdateDialog'

export const Authors = () => {
    const [authors, setAuthors] = useState<AuthorType[]>([])

    const fetchAuthors = () => {
        void supabase
            .from(TABLES.authors)
            .select(`
                id,
                firstName,
                lastName,
                books (
                    id,
                    name,
                    pageCount,
                    releaseDate,
                    author: authors (
                        id,
                        firstName,
                        lastName
                    )
                )
            `)
            .order('firstName')
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error fetching authors',
                        title: 'Error',
                    })

                    return
                }

                const mappedAuthors: AuthorType[] = response.data.map((author) => {
                    return {
                        books: author.books as BookType[],
                        firstName: author.firstName,
                        id: author.id,
                        lastName: author.lastName,
                    }
                })

                setAuthors(mappedAuthors)
            })
    }

    useEffect(() => {
        fetchAuthors()
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
                        Authors
                    </Title>
                    <AuthorCreateDialog onSubmit={fetchAuthors} />
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    overflow: 'auto',
                    padding: theme.spacing.md,
                })}
            >
                {authors.map((author) => {
                    return (
                        <Paper
                            key={author.id}
                            shadow="xs"
                        >
                            <Group
                                position="apart"
                                sx={(theme) => ({
                                    padding: theme.spacing.md,
                                })}
                            >
                                <Text>
                                    {author.firstName}
                                    {' '}
                                    {author.lastName}
                                </Text>
                                <Group>
                                    <AuthorUpdateDialog
                                        author={author}
                                        onSubmit={fetchAuthors}
                                    />
                                    <AuthorDeleteDialog
                                        author={author}
                                        disabled={Boolean(author.books?.length)}
                                        onSubmit={fetchAuthors}
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
