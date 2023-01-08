import {
    Navbar,
    Stack,
} from '@mantine/core'
import {
    IconBook,
    IconUsers,
} from '@tabler/icons-react'
import Link from 'next/link'

import { SidebarButton } from '../SidebarButton'

export const Sidebar = () => {
    return (
        <Navbar
            p="xl"
            width={{ lg: 300, sm: 200 }}
        >
            <Navbar.Section>
                <Stack spacing={0}>
                    <Link href="/books">
                        <SidebarButton
                            color="red"
                            icon={<IconBook />}
                            name="Books"
                        />
                    </Link>
                    <Link href="/employees">
                        <SidebarButton
                            color="green"
                            icon={<IconUsers />}
                            name="Employees"
                        />
                    </Link>
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
}
