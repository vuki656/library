import {
    Box,
    MantineProvider,
    useMantineTheme,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {
    AuthProvider,
    FirebaseAppProvider,
    FirestoreProvider,
} from 'reactfire'

import { Sidebar } from '../components'
import {
    auth,
    database,
    firebaseConifg,
} from '../shared/utils'

// TODO: find a good font, this ?? https://github.com/mantinedev/ui.mantine.dev/blob/4202b446b7bfbdabc49106e496d4d0c4b31e0c08/components/ActionsGrid/ActionsGrid.tsx#L32
const App = (props: AppProps) => {
    const { Component, pageProps } = props

    const theme = useMantineTheme()

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
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                <NotificationsProvider>
                    <FirebaseAppProvider firebaseConfig={firebaseConifg}>
                        <AuthProvider sdk={auth}>
                            <FirestoreProvider sdk={database}>
                                <Box
                                    sx={{
                                        backgroundColor: theme.colors.gray[0],
                                        display: 'grid',
                                        gridTemplateColumns: 'auto 1fr',
                                    }}
                                >
                                    <Sidebar />
                                    <Component {...pageProps} />
                                </Box>
                            </FirestoreProvider>
                        </AuthProvider>
                    </FirebaseAppProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}

export default App
