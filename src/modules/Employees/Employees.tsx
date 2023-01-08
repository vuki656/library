import {
    Avatar,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core'
import {
    IconPencil,
    IconTrash,
} from '@tabler/icons-react'

const users = [
    {
        firstName: 'John',
        id: '123',
        lastName: 'Doe',
    },
    {
        firstName: 'Jane',
        id: '11',
        lastName: 'Doe',
    },
]

export const Employees = () => {
    return (
        <Stack>
            <Paper
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.gray[2]}`,
                    borderRadius: 0,
                    padding: theme.spacing.md,
                })}
            >
                <Group>
                    <Title order={3}>
                        Employees
                    </Title>
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    padding: theme.spacing.md,
                })}
            >
                {users.map((user) => {
                    return (
                        <Paper>
                            <Group
                                key={user.id}
                                position="apart"
                                sx={(theme) => ({
                                    padding: theme.spacing.sm,
                                })}
                            >
                                <Group>
                                    <Avatar
                                        radius="md"
                                        size={40}
                                        src={`https://i.pravatar.cc/300?u=${user.id}`}
                                    />
                                    <Text>
                                        {user.firstName}
                                        {' '}
                                        {user.lastName}
                                    </Text>
                                </Group>
                                <Group>
                                    <ThemeIcon variant="light">
                                        <IconPencil size={20} />
                                    </ThemeIcon>
                                    <ThemeIcon variant="light">
                                        <IconTrash size={20} />
                                    </ThemeIcon>
                                </Group>
                            </Group>
                        </Paper>
                    )
                })}
            </Stack>
        </Stack>
    )
}
