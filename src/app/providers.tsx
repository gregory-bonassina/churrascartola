'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { MarketStateProvider } from '../contexts/MarketStateContext'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import { PlayersProvider } from '../contexts/PlayersContext'
import { TeamsProvider } from '../contexts/TeamsContext'
import { StyledComponentsRegistry } from '../lib/registry'
import { DefaultLayout } from '../layouts/DefaultLayout'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={defaultTheme}>
                <MarketStateProvider>
                    <TeamsProvider>
                        <PlayersProvider>
                            <DefaultLayout>{children}</DefaultLayout>
                        </PlayersProvider>
                    </TeamsProvider>
                </MarketStateProvider>
                <GlobalStyle />
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}
