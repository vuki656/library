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
import { query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { COLLECTIONS } from '../../shared/utils'

import { EmployeeCreateDialog } from './EmployeeCreateDialog'

export const Employees = () => {
    const employeesQuery = query(COLLECTIONS.employees)

    const [data] = useCollectionData(employeesQuery, {
        initialValue: [],
    })

    return (
        <Stack spacing={0}>
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
                {data?.map((user) => {
                    return (
                        <Paper key={user.id}>
                            <Group
                                position="apart"
                                sx={(theme) => ({
                                    padding: 100,
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
