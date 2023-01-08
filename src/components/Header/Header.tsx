import {
    Group,
    Header as MantineHeader,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { IconBook2 } from '@tabler/icons-react'

export const Header = () => {
    return (
        <MantineHeader
            height={{ base: 50, md: 70 }}
            p="md"
            sx={{
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <Group>
                <ThemeIcon size="xl">
                    <IconBook2 size={28} />
                </ThemeIcon>
                <Title>
                    Library
                </Title>
            </Group>
        </MantineHeader>
    )
}
