import { ThemeProvider } from 'styled-components'
import { MarketStateProvider } from './contexts/MarketStateContext'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'
import { PlayersProvider } from './contexts/PlayersContext'

export function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <MarketStateProvider>
                    <PlayersProvider>
                        <Router />
                    </PlayersProvider>
                </MarketStateProvider>
            </BrowserRouter>
            <GlobalStyle />
        </ThemeProvider>
    )
}
