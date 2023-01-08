import {
    Divider,
    Group,
    Navbar,
    Stack,
    ThemeIcon,
    Title,
} from '@mantine/core'
import {
    IconBook,
    IconBook2,
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
                <Group>
                    <ThemeIcon size="xl">
                        <IconBook2 size={28} />
                    </ThemeIcon>
                    <Title>
                        Library
                    </Title>
                </Group>
            </Navbar.Section>
            <Navbar.Section>
                <Divider
                    color="gray.3"
                    mb={8}
                    mt={18}
                />
            </Navbar.Section>
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
