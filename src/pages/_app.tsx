import {
    AppShell,
    Global,
    LoadingOverlay,
    MantineProvider,
    useMantineTheme,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Sidebar } from '../components'
import { auth } from '../shared/utils'

// TODO: find a good font, this ?? https://github.com/mantinedev/ui.mantine.dev/blob/4202b446b7bfbdabc49106e496d4d0c4b31e0c08/components/ActionsGrid/ActionsGrid.tsx#L32
const App = (props: AppProps) => {
    const {
        Component,
        pageProps,
        router,
    } = props

    const theme = useMantineTheme()

    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (!user) {
            void router.push('/')
        }
    }, [])

    return (
        <>
            <Head>
                <title>
                    Library
                </title>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <MantineProvider
                theme={{
                    colorScheme: 'light',
                    components: {
                        Modal: {
                            defaultProps: {
                                centered: true,
                                overlayBlur: 3,
                                overlayColor: theme.colors.gray[2],
                                overlayOpacity: 0.55,
                            },
                        },
                    },
                    fontFamily: 'montserrat',
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                <NotificationsProvider>
                    <Global
                        styles={{
                            '#__next': {
                                height: '100%',
                                width: '100%',
                            },
                            'html, body': {
                                backgroundColor: theme.colors.gray[0],
                                height: '100%',
                            },
                        }}
                    />
                    <LoadingOverlay visible={loading} />
                    {router.pathname !== '/' ? (
                        <AppShell
                            fixed={false}
                            navbar={<Sidebar />}
                            styles={{
                                body: {
                                    height: '100%',
                                },
                                main: {
                                    display: 'flex',
                                    padding: 0,
                                },
                                root: {
                                    height: '100%',
                                },
                            }}
                        >
                            <Component {...pageProps} />
                        </AppShell>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}

export default App
