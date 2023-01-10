import {
    Divider,
    Navbar,
    Stack,
    Title,
} from '@mantine/core'
import {
    IconBook,
    IconUsers,
} from '@tabler/icons'
import Link from 'next/link'

import { SidebarButton } from '../SidebarButton'

export const Sidebar = () => {
    return (
        <Navbar
            sx={(theme) => ({
                padding: theme.spacing.xs,
                width: '300px',
            })}
        >
            <Navbar.Section
                sx={(theme) => ({
                    padding: theme.spacing.xs,
                })}
            >
                <Title>
                    Library
                </Title>
            </Navbar.Section>
            <Navbar.Section>
                <Divider
                    color="gray.2"
                    sx={(theme) => ({
                        marginBottom: theme.spacing.sm,
                        marginTop: theme.spacing.sm,
                    })}
                />
            </Navbar.Section>
            <Navbar.Section>
                <Stack spacing={0}>
                    <Link href="/books">
                        <SidebarButton
                            color="green"
                            icon={<IconBook />}
                            name="Books"
                        />
                    </Link>
                    <Link href="/employees">
                        <SidebarButton
                            color="blue"
                            icon={<IconUsers />}
                            name="Employees"
                        />
                    </Link>
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
}
