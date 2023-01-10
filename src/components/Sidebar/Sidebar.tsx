import {
    Divider,
    Navbar,
    Title,
} from '@mantine/core'
import {
    IconBook,
    IconLogout,
    IconUsers,
} from '@tabler/icons'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { auth } from '../../shared/utils'
import { SidebarButton } from '../SidebarButton'

export const Sidebar = () => {
    const router = useRouter()

    const onLogout = async () => {
        await signOut(auth)

        void router.push('/')
    }

    // TODO: add name at the bottom
    return (
        <Navbar
            sx={(theme) => ({
                height: '100%',
                padding: theme.spacing.xs,
                width: '300px',
            })}
        >
            <Navbar.Section grow={true}>
                <Title
                    sx={(theme) => ({
                        padding: theme.spacing.xs,
                    })}
                >
                    Library
                </Title>
                <Divider
                    color="gray.2"
                    sx={(theme) => ({
                        marginBottom: theme.spacing.sm,
                        marginTop: theme.spacing.sm,
                    })}
                />
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
            </Navbar.Section>
            <Navbar.Section>
                <SidebarButton
                    color="red"
                    icon={<IconLogout />}
                    name="Log Out"
                    onClick={onLogout}
                />
            </Navbar.Section>
        </Navbar>
    )
}
