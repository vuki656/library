import {
    Avatar,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import { useEffect, useState } from 'react'

import { supabase, TABLES } from '../../shared/utils'

import { EmployeeCreateDialog } from './EmployeeCreateDialog'
import { EmployeeType } from './Employees.types'


export const Employees = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([])

    useEffect(() => {
        supabase
            .from(TABLES.employees)
            .select('*')
            .then((response) => {
                console.log(response)
            })
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
                        Employees
                    </Title>
                    <EmployeeCreateDialog />
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    overflow: 'auto',
                    padding: theme.spacing.md,
                })}
            >
                {[]?.map((user) => {
                    return (
                        <Paper
                            key={user.id}
                            shadow="xs"
                        >
                            <Group
                                position="apart"
                                sx={(theme) => ({
                                    padding: theme.spacing.md,
                                })}
                            >
                                <Group>
                                    <Avatar
                                        radius="md"
                                        size={40}
                                        src={user.photoURL}
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
                                </Group>
                            </Group>
                        </Paper>
                    )
                })}
            </Stack>
        </Stack>
    )
}
