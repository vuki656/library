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

import { EmployeeChangePasswordDialog } from './EmployeeChangePasswordDialog'
import { EmployeeCreateDialog } from './EmployeeCreateDialog'
import { EmployeeDeleteDialogDialog } from './EmployeeDeleteDialog'
import type { EmployeeType } from './Employees.types'
import { EmployeeUpdateDialog } from './EmployeeUpdateDialog'

export const Employees = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([])
    const [currentEmployeeId, setCurrentEmployeeId] = useState<string | null>(null)

    const fetchEmployees = () => {
        void supabase
            .from(TABLES.employees)
            .select(`
                id,
                firstName,
                lastName,
                email
            `)
            .order('firstName')
            .returns<EmployeeType>()
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error fetching employees',
                        title: 'Error',
                    })

                    return
                }

                setEmployees(response.data)
            })
    }

    const fetchCurrentEmployeeId = () => {
        void supabase
            .auth
            .getUser()
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error current employee',
                        title: 'Error',
                    })

                    return
                }

                setCurrentEmployeeId(response.data.user.id)
            })
    }

    useEffect(() => {
        fetchEmployees()
        fetchCurrentEmployeeId()
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
                    <EmployeeCreateDialog onSubmit={fetchEmployees} />
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    overflow: 'auto',
                    padding: theme.spacing.md,
                })}
            >
                {employees.map((employee) => {
                    return (
                        <Paper
                            key={employee.id}
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
                                        {employee.firstName}
                                        {' '}
                                        {employee.lastName}
                                    </Text>
                                </Group>
                                <Group>
                                    {employee.id === currentEmployeeId ? (
                                        <EmployeeChangePasswordDialog onSubmit={fetchEmployees} />
                                    ) : null}
                                    <EmployeeUpdateDialog
                                        employee={employee}
                                        onSubmit={fetchEmployees}
                                    />
                                    <EmployeeDeleteDialogDialog
                                        employee={employee}
                                        onSubmit={fetchEmployees}
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
