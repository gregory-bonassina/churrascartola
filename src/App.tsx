import { ThemeProvider } from 'styled-components'
import { MarketStateProvider } from './contexts/MarketStateContext'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <MarketStateProvider>
                    <Router />
                </MarketStateProvider>
            </BrowserRouter>
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default App
