import {
    Avatar,
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

import { SidebarButton } from '../SidebarButton'

export const Sidebar = () => {
    const router = useRouter()

    const onLogout = async () => {
        void router.push('/')
    }

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
                            marginBottom: theme.spacing.md,
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
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack spacing={10}>
                    <SidebarButton
                        color="red"
                        icon={<IconLogout />}
                        name="Log Out"
                        onClick={onLogout}
                    />
                    <Divider />
                    <Group
                        sx={(theme) => ({
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            padding: theme.spacing.xs,
                        })}
                    >
                        <Avatar
                            radius="md"
                            size={40}
                            src={''}
                        />
                        <Stack spacing={0}>
                            <Text
                                sx={(theme) => ({
                                    fontSize: theme.fontSizes.sm,
                                    fontWeight: 500,
                                })}
                            >
                                {''}
                            </Text>
                            <Text
                                sx={(theme) => ({
                                    color: 'dimgray',
                                    fontSize: theme.fontSizes.xs,
                                })}
                            >
                                {''}
                            </Text>
                        </Stack>
                    </Group>
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
}
