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
import { MemberCreateDialog } from './MemberCreateDialog'

import type { MemberType } from './Members.types'

export const Members = () => {
    const [members, setMembers] = useState<MemberType[]>([])

    const fetchMembers = () => {
        void supabase
            .from(TABLES.members)
            .select('*')
            .order('firstName')
            .then((response) => {
                if (response.error) {
                    console.error(response.error)

                    showNotification({
                        color: 'red',
                        message: 'Error fetching members',
                        title: 'Error',
                    })

                    return
                }

                setMembers(response.data)
            })
    }

    useEffect(() => {
        fetchMembers()
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
                        Members
                    </Title>
                    <MemberCreateDialog onSubmit={fetchMembers} />
                </Group>
            </Paper>
            <Stack
                sx={(theme) => ({
                    overflow: 'auto',
                    padding: theme.spacing.md,
                })}
            >
                {members.map((member) => {
                    return (
                        <Paper
                            key={member.id}
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
                                        {member.firstName}
                                        {' '}
                                        {member.lastName}
                                    </Text>
                                </Group>
                                {/* <Group> */}
                                {/*     <MemberUpdateDialog */}
                                {/*         member={member} */}
                                {/*         onSubmit={fetchMembers} */}
                                {/*     /> */}
                                {/*     <MemberDeleteDialog */}
                                {/*         member={member} */}
                                {/*         onSubmit={fetchMembers} */}
                                {/*     /> */}
                                {/* </Group> */}
                            </Group>
                        </Paper>
                    )
                })}
            </Stack>
        </Stack>
    )
}
