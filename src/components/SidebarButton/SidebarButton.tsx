import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'
import { cloneElement } from 'react'

import type { SidebarButtonProps } from './SidebarButton.types'

export const SidebarButton = (props: SidebarButtonProps) => {
    const {
        color,
        icon,
        name,
    } = props

    return (
        <UnstyledButton
            sx={(theme) => ({
                '&:hover': {
                    backgroundColor: theme.colors.gray[1],
                },
                borderRadius: theme.radius.sm,
                padding: theme.spacing.xs,
                width: '100%',
            })}
        >
            <Group>
                <ThemeIcon
                    color={color}
                    size="md"
                    variant="light"
                >
                    {cloneElement(icon, {
                        size: 20,
                    })}
                </ThemeIcon>
                <Text
                    size="sm"
                    weight={500}
                >
                    {name}
                </Text>
            </Group>
        </UnstyledButton>
    )
}
