import { ThemeProvider } from 'styled-components'
import { MarketStateProvider } from './contexts/MarketStateContext'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'
import { PlayersProvider } from './contexts/PlayersContext'
import { TeamsProvider } from './contexts/TeamsContext'

export function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <MarketStateProvider>
                    <TeamsProvider>
                        <PlayersProvider>
                            <Router />
                        </PlayersProvider>
                    </TeamsProvider>
                </MarketStateProvider>
            </BrowserRouter>
            <GlobalStyle />
        </ThemeProvider>
    )
}
