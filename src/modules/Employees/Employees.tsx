import {
    Avatar,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { createClient } from '@supabase/supabase-js'
import { IconPencil } from '@tabler/icons'
import { query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { COLLECTIONS } from '../../shared/utils'

import { EmployeeCreateDialog } from './EmployeeCreateDialog'
import { EmployeeType } from './Employees.types'

const supabase = createClient('https://zrafiyrzqgcuvjqplyqt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYWZpeXJ6cWdjdXZqcXBseXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0NjA1OTgsImV4cCI6MTk4OTAzNjU5OH0.OnrIWTHxCNXFml-S05xe92RsN98QTupeoBQg6G5f8Ms')

export const Employees = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([])

    // TODO: delete user
    // TODO: update user

    useEffect(() => {
        supabase
            .from('employees')
            .select('*')
            .then((respoonse) => {
                console.log('respoonse: ', respoonse)
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
                {data?.map((user) => {
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
