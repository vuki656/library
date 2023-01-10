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
import { useFirestoreCollectionData } from 'reactfire'

import { COLLECTIONS } from '../../shared/utils'

import { EmployeeCreateDialog } from './EmployeeCreateDialog'
import type { EmployeeType } from './Employees.types'

export const Employees = () => {
    const employeesQuery = query(COLLECTIONS.employees)

    // FIXME: query type, prob make a wrapper and cast
    const { data, status } = useFirestoreCollectionData<EmployeeType>(employeesQuery as any, {
        initialData: [],
    })

    console.log(data)

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
                {data.map((user) => {
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
