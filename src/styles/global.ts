import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        /* box-shadow: 0 0 0 2px ${(props) => props.theme['red-400']}; */
    }

    body {
        background-color: ${(props) => props.theme['gray-800']};
        color: ${(props) => props.theme['gray-100']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme['red-400']};
        border: 4px solid transparent;
        border-radius: 8px;
        background-clip: padding-box;
    }

    ::-webkit-scrollbar {
        width: 1rem;
    }
`
