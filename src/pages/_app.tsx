import '@mantine/core/styles.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalLayout from '@/layouts/global'
import { MantineProvider, createTheme } from '@mantine/core'

import { store } from '@/store'
import { Provider as StoreProvider } from 'react-redux'

const theme = createTheme({})

export default function App({ Component, pageProps }: AppProps) {
  return <StoreProvider store={store}>
    <MantineProvider theme={theme}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </MantineProvider>
  </StoreProvider>
}
