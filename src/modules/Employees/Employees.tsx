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
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import { database } from '../../shared/utils'

import { EmployeeCreateDialog } from './EmployeeCreateDialog'

export const Employees = () => {
    // TODO: how to type this cleanly
    const [value, loading, error] = useCollection(collection(database, 'employees'))

    return (
        <Stack>
            <Paper
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.gray[2]}`,
                    borderRadius: 0,
                    padding: theme.spacing.md,
                })}
            >
                <Group position="apart">
                    <Title order={3}>
                        Employees
                    </Title>
                    <EmployeeCreateDialog />
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    padding: theme.spacing.md,
                })}
            >
                {value?.docs.map((user) => {
                    return (
                        <Paper key={user.id}>
                            <Group
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
