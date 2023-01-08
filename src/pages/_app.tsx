import {
    Box,
    MantineProvider,
} from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Sidebar } from '../components'

// TODO: find a good font, this ?? https://github.com/mantinedev/ui.mantine.dev/blob/4202b446b7bfbdabc49106e496d4d0c4b31e0c08/components/ActionsGrid/ActionsGrid.tsx#L32
const App = (props: AppProps) => {
    const { Component, pageProps } = props

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
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colors.gray[0],
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                    })}
                >
                    <Sidebar />
                    <Component {...pageProps} />
                </Box>
            </MantineProvider>
        </>
    )
}

export default App
