import {
    Group,
    Paper,
    Stack,
    Title,
} from '@mantine/core'

import { BookCreateDialog } from './BookCreateDialog'

export const Books = () => {
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
        </Stack>
    )
}
