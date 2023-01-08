import type { AppProps } from "next/app"
import { MantineProvider } from '@mantine/core';
import Head from "next/head";

const App = (props: AppProps) => {
    const { Component, pageProps } = props

    return (
        <>
            <Head>
                <title>Library</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: "light" }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
}

export default App
