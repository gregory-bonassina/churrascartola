import { ThemeProvider } from 'styled-components'
import { Header } from './components/Header'
import { MarketState } from './components/MarketState'
import { Home } from './pages/Home'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { MarketStateProvider } from './contexts/MarketStateContext'

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <MarketStateProvider>
                <GlobalStyle />
                <Header />
                <MarketState />
                <Home />
            </MarketStateProvider>
        </ThemeProvider>
    )
}

export default App
