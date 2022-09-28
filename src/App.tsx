import { ThemeProvider } from 'styled-components'
import { Header } from './components/Header'
import { MarketState } from './components/MarketState'
import { Home } from './pages/Home'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <Header />
            <MarketState />
            <Home />
        </ThemeProvider>
    )
}

export default App
