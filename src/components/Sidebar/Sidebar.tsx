import {
    Divider,
    Group,
    Navbar,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import {
    IconBook,
    IconLogout,
    IconUsers,
} from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    useEffect,
    useState,
} from 'react'

import type { EmployeeType } from '../../modules'
import { DEFAULT_ICON_SIZE } from '../../shared/constants'
import {
    supabase,
    TABLES,
} from '../../shared/utils'
import { BorrowBookDialog } from '../BorrowBookDialog'
import { SidebarButton } from '../SidebarButton'

export const Sidebar = () => {
    const router = useRouter()

    const [currentEmployee, setCurrentEmployee] = useState<EmployeeType | null>(null)

    const onLogout = () => {
        void supabase
            .auth
            .signOut()
            .then(() => {
                void router.push('/')
            })
    }

    const fetchCurrentEmployee = async () => {
        if (currentEmployee) {
            return
        }

        const authCurrentEmployee = await supabase
            .auth
            .getUser()

        void supabase
            .from(TABLES.employees)
            .select('*')
            .eq('id', authCurrentEmployee.data.user?.id)
            .single()
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    return
                }

                setCurrentEmployee(response.data)
            })
    }

    useEffect(() => {
        void fetchCurrentEmployee()
    }, [])

    return (
        <Navbar
            sx={(theme) => ({
                height: '100%',
                padding: theme.spacing.xs,
                width: '300px',
            })}
        >

            <Title
                sx={(theme) => ({
                    padding: theme.spacing.xs,
                    paddingBottom: theme.spacing.xl,
                })}
            >
                Library
            </Title>
            <Navbar.Section grow={true}>
                <Stack spacing={3}>
                    <Divider
                        sx={(theme) => ({
                            marginBottom: theme.spacing.sm,
                        })}
                    />
                    <BorrowBookDialog />
                    <Divider
                        sx={(theme) => ({
                            marginBottom: theme.spacing.md,
                            marginTop: theme.spacing.sm,
                        })}
                    />
                    <Link href="/books">
                        <SidebarButton
                            color="green"
                            icon={<IconBook size={DEFAULT_ICON_SIZE} />}
                            name="Books"
                        />
                    </Link>
                    <Link href="/employees">
                        <SidebarButton
                            color="blue"
                            icon={<IconUsers size={DEFAULT_ICON_SIZE} />}
                            name="Employees"
                        />
                    </Link>
                    <Link href="/authors">
                        <SidebarButton
                            color="red"
                            icon={<IconUsers size={DEFAULT_ICON_SIZE} />}
                            name="Authors"
                        />
                    </Link>
                    <Link href="/members">
                        <SidebarButton
                            color="orange"
                            icon={<IconUsers size={DEFAULT_ICON_SIZE} />}
                            name="Members"
                        />
                    </Link>
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack spacing={10}>
                    <SidebarButton
                        color="red"
                        icon={<IconLogout size={DEFAULT_ICON_SIZE} />}
                        name="Log Out"
                        onClick={onLogout}
                    />
                    <Divider />
                    <Stack
                        spacing={0}
                        sx={(theme) => ({
                            padding: theme.spacing.sm,
                        })}
                    >
                        <Text
                            sx={(theme) => ({
                                fontSize: theme.fontSizes.sm,
                                fontWeight: 500,
                            })}
                        >
                            <Group>
                                {currentEmployee?.firstName}
                                {' '}
                                {currentEmployee?.lastName}
                            </Group>
                        </Text>
                        <Text
                            sx={(theme) => ({
                                color: 'dimgray',
                                fontSize: theme.fontSizes.xs,
                            })}
                        >
                            {currentEmployee?.email}
                        </Text>
                    </Stack>
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
}
