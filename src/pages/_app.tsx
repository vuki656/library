import {
    AppShell,
    MantineProvider,
    useMantineTheme,
} from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Sidebar } from '../components'

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
                    fontFamily: 'montserrat',
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                <AppShell
                    asideOffsetBreakpoint="sm"
                    navbar={<Sidebar />}
                    navbarOffsetBreakpoint="sm"
                    styles={{
                        main: {
                            background: theme.colors.gray[0],
                        },
                    }}
                >
                    <Component {...pageProps} />
                </AppShell>
            </MantineProvider>
        </>
    )
}

export default App
